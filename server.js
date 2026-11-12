const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.static('public'));
app.get('/health', (req, res) => res.send('ok'));

app.get('/db', async (req, res) => {
  try {
    const c = await mysql.createConnection({
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    const [rows] = await c.query('SELECT NOW() AS ahora');
    await c.end();
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = app;
if (require.main === module) app.listen(3000, () => console.log('Escuchando en 3000'));

