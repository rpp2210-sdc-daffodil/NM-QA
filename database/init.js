const { Client } = require('pg');

const db = new Client({
  user: 'nickmonteleone',
  password: 'pepper',
  host: 'ip-172-31-95-166.ec2.internal',
  database: 'qanda',
  port: '5432',
});

db.connect();

module.exports = db;
