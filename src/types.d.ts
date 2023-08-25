import type { Server } from 'socket.io'

import 'nullstack'

declare module 'nullstack' {
  export interface NullstackInstances {
    ninja: { loadNinjaMode(): Promise<void> }
    tasks: { loadTasks(): Promise<void> }
    websocket: { socket: Server }
  }
}
