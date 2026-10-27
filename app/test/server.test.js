const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const { createServer } = require('../server');

function get(port, path) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: '127.0.0.1', port, path }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () =>
          resolve({ status: res.statusCode, body: JSON.parse(data) })
        );
      })
      .on('error', reject);
  });
}

test('server endpoints', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());
  const { port } = server.address();

  await t.test('GET /health returns ok', async () => {
    const res = await get(port, '/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'ok');
  });

  await t.test('GET / returns greeting and version', async () => {
    const res = await get(port, '/');
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.message);
    assert.ok(res.body.version);
  });

  await t.test('unknown path returns 404', async () => {
    const res = await get(port, '/nope');
    assert.strictEqual(res.status, 404);
  });
});
