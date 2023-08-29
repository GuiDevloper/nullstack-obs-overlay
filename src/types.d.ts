import 'nullstack'
import { SocketClient } from './components/WebSocket'

declare module 'nullstack' {
  export interface NullstackInstances {
    ninja: { loadNinjaMode(): Promise<void> }
    tasks: { loadTasks(): Promise<void> }
    websocket: { socket: SocketClient }
  }
}
