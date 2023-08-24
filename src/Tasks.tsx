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

  static async setTaskDone({ taskId }: { taskId: number }) {
    const tasks = await Tasks.getTasks()
    tasks.splice(taskId, 1, { ...tasks[taskId], done: true })
    writeFileSync(tasksFilePath, JSON.stringify(tasks, null, '  '))
  }

  async hydrate() {
    this.tasks = await Tasks.getTasks()
  }

  async doneTask({ taskId }: { taskId: number }) {
    await Tasks.setTaskDone({ taskId })
    this.hydrate()
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
