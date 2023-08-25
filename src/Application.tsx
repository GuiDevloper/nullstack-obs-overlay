import './Application.scss'
import Nullstack, { NullstackNode } from 'nullstack'

import Home from './Home'
import Manage from './Manage'
import WebSocket from './WebSocket'

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
        <WebSocket key="websocket" />
        <Home route="/" />
        <Manage route="/manage" />
      </main>
    )
  }

}

export default Application
