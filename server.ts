import Nullstack, { NullstackServerContext } from 'nullstack'

import Application from './src/Application'
import WebSocket from './src/WebSocket'

const context = Nullstack.start(Application) as NullstackServerContext

context.start = WebSocket.startSocket

export default context
