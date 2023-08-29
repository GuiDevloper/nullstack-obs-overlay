import './Tasks.scss'
import Nullstack from 'nullstack'

import { readFileSync, writeFileSync } from 'fs'

import WebSocket from './WebSocket'

const tasksFilePath = './src/data/tasks.json'

type Task = {
  task: string
  done: boolean
}

class Tasks extends Nullstack {

  tasks: Task[] = []
  static tasks: Task[] = []

  static async getTasks(): Promise<Task[]> {
    Tasks.tasks = JSON.parse(readFileSync(tasksFilePath, 'utf8'))
    return Tasks.tasks
  }

  static async saveTasks() {
    writeFileSync(tasksFilePath, JSON.stringify(Tasks.tasks, null, '  '))
    WebSocket.io.emit('reload-tasks')
  }

  static async toogleTaskDone({ taskId }: { taskId: number }) {
    Tasks.tasks.splice(taskId, 1, {
      ...Tasks.tasks[taskId],
      done: !Tasks.tasks[taskId].done
    })
    await Tasks.saveTasks()
  }

  static async createTask({ task }: { task: string }) {
    Tasks.tasks.push({ task, done: false })
    await Tasks.saveTasks()
  }

  hydrate = this.loadTasks

  async loadTasks() {
    this.tasks = await Tasks.getTasks()
  }

  async doneTask({ taskId }: { taskId: number }) {
    await Tasks.toogleTaskDone({ taskId })
  }

  render() {
    return (
      <section class="tasks">
        <h1 class="title">Tarefas:</h1>
        <ul class="list">
          {this.tasks.map((task, taskId) => (
            <li
              class={task.done && 'done'}
              onclick={() => this.doneTask({ taskId })}
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
