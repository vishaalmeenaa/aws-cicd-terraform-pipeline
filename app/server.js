const http = require('http');

const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || 'dev';

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function createServer() {
  return http.createServer((req, res) => {
    if (req.url === '/health') {
      return send(res, 200, { status: 'ok' });
    }
    if (req.url === '/') {
      return send(res, 200, {
        message: 'Hello from the CI/CD pipeline by Vishal Meena',
        version: VERSION,
      });
    }
    return send(res, 404, { error: 'not found' });
  });
}

module.exports = { createServer };

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (version ${VERSION})`);
  });
}
