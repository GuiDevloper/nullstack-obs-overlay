import Nullstack from 'nullstack'

import NinjaMode from './components/NinjaMode'
import Tasks from './components/Tasks'

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
