import './Tasks.scss'
import Nullstack from 'nullstack'

import { readFileSync, writeFileSync } from 'fs'

const tasksFilePath = './src/tasks.json'

type Task = {
  task: string
  done: boolean
}

class Tasks extends Nullstack {

  tasks: Task[] = []

  static async getTasks(): Promise<Task[]> {
    return JSON.parse(readFileSync(tasksFilePath, 'utf8'))
  }

  static async toogleTaskDone({ taskId }: { taskId: number }) {
    const tasks = await Tasks.getTasks()
    tasks.splice(taskId, 1, { ...tasks[taskId], done: !tasks[taskId].done })
    writeFileSync(tasksFilePath, JSON.stringify(tasks, null, '  '))
  }

  static async createTask({ task }: { task: string }) {
    const tasks = await Tasks.getTasks()
    tasks.push({ task, done: false })
    writeFileSync(tasksFilePath, JSON.stringify(tasks, null, '  '))
  }

  hydrate = this.loadTasks

  async loadTasks() {
    this.tasks = await Tasks.getTasks()
  }

  async doneTask({ taskId }: { taskId: number }) {
    await Tasks.toogleTaskDone({ taskId })
    await this.loadTasks()
  }

  render() {
    return (
      <section class="tasks">
        <h1 class="title">Tarefas:</h1>
        <ul class="list">
          {this.tasks.map((task, taskId) => (
            <li
              key={taskId}
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
