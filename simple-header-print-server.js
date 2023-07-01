const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Received a request!');
  console.log('Request headers:', req.headers);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Server responded!');
});

server.listen(8000, 'localhost', () => {
  console.log('Simple Header Printing Server is running on http://localhost:8000');
});
