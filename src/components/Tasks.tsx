import './Tasks.scss'
import Nullstack from 'nullstack'

import { readFileSync, writeFileSync } from 'fs'

import WebSocket from './WebSocket'

const tasksFilePath = './src/data/tasks.json'

type Task = {
  id: number
  task: string
  done: boolean
  deleted?: boolean
}

class Tasks extends Nullstack {

  tasks: Task[] = []
  static tasks: Task[] = []

  static async getTasks(): Promise<Task[]> {
    Tasks.tasks = JSON.parse(readFileSync(tasksFilePath, 'utf8'))
    const tasks = Tasks.tasks.filter(task => !task.deleted)
    if (tasks.length < 6) {
      return tasks
    }
    const mappedTasks = tasks.reduce(
      (prev, cur) => {
        if (cur.done) {
          prev.done.push(cur)
        } else {
          prev.undone.push(cur)
        }
        return prev
      },
      { done: [], undone: [] }
    )
    let sliceIdx = 5 - mappedTasks.undone.length
    sliceIdx = sliceIdx < 1 ? -2 : -sliceIdx
    return [...mappedTasks.done.slice(sliceIdx), ...mappedTasks.undone]
  }

  static async saveTasks() {
    writeFileSync(tasksFilePath, JSON.stringify(Tasks.tasks, null, '  '))
    WebSocket.io.emit('reload-tasks')
  }

  static async toogleTaskDone({ taskId }: { taskId: number }) {
    const idx = Tasks.tasks.findIndex(val => val.id === taskId)
    Tasks.tasks.splice(idx, 1, {
      ...Tasks.tasks[idx],
      done: !Tasks.tasks[idx].done
    })
    await Tasks.saveTasks()
  }

  static async createTask({ task }: { task: string }) {
    Tasks.tasks.push({ task, id: Tasks.tasks.length + 1, done: false })
    await Tasks.saveTasks()
  }

  static async deleteTask({ taskId }: { taskId: number }) {
    const idx = Tasks.tasks.findIndex(val => val.id === taskId)
    Tasks.tasks.splice(idx, 1, {
      ...Tasks.tasks[idx],
      deleted: true
    })
    await Tasks.saveTasks()
  }

  hydrate = this.loadTasks

  async loadTasks() {
    this.tasks = await Tasks.getTasks()
  }

  async doneTask({ taskId }: { taskId: number }) {
    await Tasks.toogleTaskDone({ taskId })
  }

  async doneByKey({
    event,
    taskId
  }: {
    event: { key: string }
    taskId: number
  }) {
    if (event.key === 'Enter') {
      await this.doneTask({ taskId })
    }
    if (event.key === 'Delete') {
      await Tasks.deleteTask({ taskId })
    }
  }

  render() {
    return (
      <section class="tasks">
        <h1 class="title">Tarefas:</h1>
        <ul class="list">
          {this.tasks.map(task => (
            <li
              key={task.id}
              class={task.done && 'done'}
              onclick={() => this.doneTask({ taskId: task.id })}
              onkeyup={ev =>
                this.doneByKey({ event: ev.event, taskId: task.id })
              }
              tabindex="1"
            >
              {task.task}
            </li>
          ))}
        </ul>
      </section>
    )
  }

}

export default Tasks
