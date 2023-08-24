import './NinjaMode.scss'
import Nullstack from 'nullstack'

class NinjaMode extends Nullstack {

  render() {
    return (
      <section class="ninja">
        <h2 class="title">
          Modo Ninja! (Sem mic/cam) <img src="/ninja-emoji.png" class="emoji" />
        </h2>
      </section>
    )
  }

}

export default NinjaMode
