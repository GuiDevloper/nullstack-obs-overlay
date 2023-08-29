import './Manage.scss'
import Nullstack, { NullstackClientContext } from 'nullstack'

import Tasks from './components/Tasks'
import Home from './Home'

class Manage extends Nullstack {

  newTask: string

  async addTask() {
    await Tasks.createTask({ task: this.newTask })
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
