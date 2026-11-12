const test = require('node:test');
const assert = require('node:assert');
const app = require('../server');

test('GET /health devuelve ok', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/health`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(await res.text(), 'ok');
  server.close();
});



