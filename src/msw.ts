import { setupServer } from 'msw/node'


// This configures a request mocking server with zero request handlers
export const server = setupServer(...[] as any)

server.listen({
    onUnhandledRequest: 'bypass',
  })
