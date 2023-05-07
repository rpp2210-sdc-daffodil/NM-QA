const { Client } = require('pg');

const db = new Client({
  user: 'nickmonteleone',
  host: 'localhost',
  database: 'qanda',
  port: '5432',
});

db.connect();

module.exports = db;
