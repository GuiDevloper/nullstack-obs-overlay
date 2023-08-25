import './Application.scss'
import Nullstack, { NullstackNode } from 'nullstack'

import Manage from './Manage'
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
        <div route="/">
          <NinjaMode />
          <Tasks />
        </div>
        <Manage route="/manage" />
      </main>
    )
  }

}

export default Application
