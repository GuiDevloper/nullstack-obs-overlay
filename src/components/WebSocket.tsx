import Nullstack, {
  NullstackClientContext,
  NullstackServerContext
} from 'nullstack'

import { Server } from 'socket.io'
import { io, Socket } from 'socket.io-client'

import NinjaMode from './NinjaMode'

class WebSocket extends Nullstack {

  static async getWSPort(context?: unknown): Promise<number> {
    const { server } = context as NullstackServerContext
    return +server.port + 1
  }

  static io: Server
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
        ws.emit('load-ninja')
      })
    })

    WebSocket.io = ws
  }

  socket: Socket

  async connectClient(context: NullstackClientContext) {
    const { instances } = context as NullstackClientContext
    const WSPort = await WebSocket.getWSPort()
    const socket = this.socket || io(`ws://localhost:${WSPort}`)

    socket.on('load-ninja', instances.ninja.loadNinjaMode)

    this.socket = socket
  }

  hydrate = this.connectClient

}

export default WebSocket
