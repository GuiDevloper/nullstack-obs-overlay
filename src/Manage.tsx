import './Manage.scss'
import Nullstack, { NullstackClientContext } from 'nullstack'

import Tasks from './Tasks'

class Manage extends Nullstack {

  newTask: string

  async addTask({ instances }: NullstackClientContext) {
    await Tasks.createTask({ task: this.newTask })
    await (instances.tasks as { loadTasks(): Promise<void> }).loadTasks()
  }

  render() {
    return (
      <section class="manage">
        <h1>Manage</h1>
        <form onsubmit={this.addTask}>
          <input
            type="text"
            bind={this.newTask}
            placeholder="New Task"
            required
          />
          <button>Add Task</button>
        </form>
        <Tasks key="tasks" />
      </section>
    )
  }

}

export default Manage
