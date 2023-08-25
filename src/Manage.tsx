import './Manage.scss'
import Nullstack, { NullstackClientContext } from 'nullstack'

import Home from './Home'
import Tasks from './Tasks'

class Manage extends Nullstack {

  newTask: string

  async addTask({ instances }: NullstackClientContext) {
    await Tasks.createTask({ task: this.newTask })
    await instances.tasks.loadTasks()
  }

  async toogleNinja({ instances }: NullstackClientContext) {
    instances.websocket.socket.emit('toogle-ninja')
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
        <Home />
      </section>
    )
  }

}

export default Manage
