import Nullstack from 'nullstack'

import NinjaMode from './NinjaMode'
import Tasks from './Tasks'

class Home extends Nullstack {

  render() {
    return (
      <>
        <NinjaMode key="ninja" />
        <Tasks key="tasks" />
      </>
    )
  }

}

export default Home
