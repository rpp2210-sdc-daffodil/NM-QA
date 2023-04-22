const express = require('express');
const app = express();
const dbTest = require('../database/initTest.js');

app.use(express.json());

app.get('/test', (req, res, next) => {
  dbTest.query('SELECT * from photos', (err, results) => {
    if (err) {
      res.sendStatus(404);
    } else {
      console.log('results, ', results);
      res.json(results);
    }
  })
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
})
