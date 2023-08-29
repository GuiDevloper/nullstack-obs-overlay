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

  prepare({ page }: NullstackClientContext) {
    page.title = 'Manage Overlay'
  }

  render() {
    return (
      <section class="manage">
        <h1>Manage</h1>
        <button
          onclick={this.toogleNinja}
          tabindex="1"
        >
          Toogle Ninja Mode
        </button>
        <form onsubmit={this.addTask}>
          <input
            type="text"
            bind={this.newTask}
            placeholder="New Task"
            required
            tabindex="1"
          />
        </form>
        <Home />
      </section>
    )
  }

}

export default Manage
