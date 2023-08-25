import './NinjaMode.scss'
import Nullstack from 'nullstack'

import { readFileSync, writeFileSync } from 'fs'

const ninjaFilePath = './src/ninja.json'

class NinjaMode extends Nullstack {

  isNinja: boolean
  static async getNinjaMode(): Promise<boolean> {
    return JSON.parse(readFileSync(ninjaFilePath, 'utf8')).isNinja
  }

  static async toogleNinjaMode() {
    const isNinja = await NinjaMode.getNinjaMode()
    const json = { isNinja: !isNinja }
    writeFileSync(ninjaFilePath, JSON.stringify(json, null, '  '))
  }

  async loadNinjaMode() {
    this.isNinja = await NinjaMode.getNinjaMode()
  }

  hydrate = this.loadNinjaMode

  render() {
    if (!this.isNinja) return false
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
