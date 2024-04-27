const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'tugas-ukm-softdev-express-api',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

module.exports = db;