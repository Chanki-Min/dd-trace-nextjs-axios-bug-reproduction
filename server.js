// import { Tracer } from "dd-trace"

// Init dd-trace
const tracer = require('dd-trace').init() //as Tracer

tracer.use('http', {
  hooks: {
    request: (
      span,
      request,
      response,
    ) => {
      console.log(`tracer got http.request that requests to <${span.context()._tags['http.url']}>`)    },
  }
})

tracer.use('fetch', {
  hooks: {
    request: (
      span,
      request,
      response,
    ) => {
      console.log(`tracer got fetch.request that requests to <${span.context()._tags['http.url']}>`)
    },
  }
})

// Next.js Custom server
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
 
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
