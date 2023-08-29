import Nullstack, {
  NullstackClientContext,
  NullstackServerContext
} from 'nullstack'

import { Server } from 'socket.io'
import { io, Socket } from 'socket.io-client'

import NinjaMode from './NinjaMode'

export type SocketServerListen = {
  'toogle-ninja'(): void
}

export type SocketServerEmits = {
  'reload-ninja'(): void
  'reload-tasks'(): void
}

export type SocketClient = Socket<SocketServerEmits, SocketServerListen>

class WebSocket extends Nullstack {

  static async getWSPort(context?: unknown): Promise<number> {
    const { server } = context as NullstackServerContext
    return +server.port + 1
  }

  static io: Server<SocketServerListen, SocketServerEmits>
  static async startSocket() {
    if (WebSocket.io) return

    const WSPort = await WebSocket.getWSPort()
    const ws = new Server(WSPort, {
      cors: { origin: '*' }
    })
    ws.on('connection', async socket => {
      // eslint-disable-next-line no-console
      console.log(`new connection: ${socket.id}`)

      socket.on('toogle-ninja', async () => {
        await NinjaMode.toogleNinjaMode()
        ws.emit('reload-ninja')
      })
    })

    WebSocket.io = ws
  }

  socket: SocketClient

  async connectClient(context: NullstackClientContext) {
    const { instances } = context as NullstackClientContext
    const WSPort = await WebSocket.getWSPort()
    const socket = this.socket || io(`ws://localhost:${WSPort}`)

    socket.on('reload-ninja', instances.ninja.loadNinjaMode)
    socket.on('reload-tasks', instances.tasks.loadTasks)

    this.socket = socket
  }

  hydrate = this.connectClient

}

export default WebSocket
