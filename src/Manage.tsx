import './Manage.scss'
import Nullstack, { NullstackClientContext } from 'nullstack'

import NinjaMode from './NinjaMode'
import Tasks from './Tasks'

class Manage extends Nullstack {

  newTask: string

  async addTask({ instances }: NullstackClientContext) {
    await Tasks.createTask({ task: this.newTask })
    await (instances.tasks as { loadTasks(): Promise<void> }).loadTasks()
  }

  async toogleNinja({ instances }: NullstackClientContext) {
    await NinjaMode.toogleNinjaMode()
    await (
      instances.ninja as { loadNinjaMode(): Promise<void> }
    ).loadNinjaMode()
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
        <button onclick={this.toogleNinja}>Toogle Ninja Mode</button>
        <NinjaMode key="ninja" />
        <Tasks key="tasks" />
      </section>
    )
  }

}

export default Manage
