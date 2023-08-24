import './Application.scss'
import Nullstack, { NullstackNode } from 'nullstack'

import NinjaMode from './NinjaMode'
import Tasks from './Tasks'

declare function Head(): NullstackNode

class Application extends Nullstack {

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&display=swap"
          rel="stylesheet"
        />
      </head>
    )
  }

  render() {
    return (
      <main class="overlay">
        <Head />
        <NinjaMode />
        <Tasks />
      </main>
    )
  }

}

export default Application
