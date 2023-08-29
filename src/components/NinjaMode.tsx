import './NinjaMode.scss'
import Nullstack from 'nullstack'

import { readFileSync, writeFileSync } from 'fs'

const ninjaFilePath = './src/data/ninja.json'

class NinjaMode extends Nullstack {

  isNinja: boolean
  static isNinja: boolean

  static async getNinjaMode(): Promise<boolean> {
    NinjaMode.isNinja = JSON.parse(readFileSync(ninjaFilePath, 'utf8')).isNinja
    return NinjaMode.isNinja
  }

  static async saveNinjaMode() {
    writeFileSync(
      ninjaFilePath,
      JSON.stringify({ isNinja: NinjaMode.isNinja }, null, '  ')
    )
  }

  static async toogleNinjaMode() {
    NinjaMode.isNinja = !NinjaMode.isNinja
    await NinjaMode.saveNinjaMode()
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
          Modo Ninja! (Sem mic/cam)
          <img
            src="/ninja-emoji.png"
            class="emoji"
          />
        </h2>
      </section>
    )
  }

}

export default NinjaMode
