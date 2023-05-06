const express = require('express');
// eslint-disable-next-line import/extensions
const queries = require('./queries.js');

const app = express();

// eslint-disable-next-line import/extensions
const dbTest = require('../database/initTest.js');

// eslint-disable-next-line import/extensions
const db = require('../database/init.js');

app.use(express.json());

// app.get('/test', (req, res, next) => {
//   dbTest.query('SELECT * from photos', (err, results) => {
//     if (err) {
//       res.sendStatus(404);
//     } else {
//       console.log('results, ', results);
//       res.json(results);
//     }
//   })
// });

app.get('/qa/questions/:product_id', (req, res, next) => {
  const productID = req.params.product_id;
  const count = req.params.count ? req.params.count : 5;
  const page = req.params.page ? req.params.page : 1;

  queries.getQuestions(db, productID, count, page, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      // console.log(results.rows[0].results.length);
      res.json(results.rows);
    }
  });
});

app.get('/qa/questions/:question_id/answers', (req, res, next) => {
  const questionID = req.params.question_id;
  const count = req.query.count ? req.query.count : 5;
  const page = req.query.page ? req.query.page : 1;

  queries.getAnswers(db, questionID, count, page, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      // console.log(results);
      res.json(results.rows);
    }
  });
});

app.post('/qa/questions', (req, res, next) => {
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const productID = req.body.product_id;
  console.log(body, name, email, productID);
  res.sendStatus(201);

});

app.post('/qa/questions/:question_id/answers', (req, res, next) => {
  const questionID = req.params.question_id;
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos;
  console.log(questionID);
  res.sendStatus(201);
});

app.put('/qa/questions/:question_id/helpful', (req, res, next) => {
  const questionID = req.params.question_id;
  console.log(questionID);
  res.sendStatus(204);
});

app.put('/qa/questions/:question_id/report', (req, res, next) => {
  const questionID = req.params.question_id;
  console.log(questionID);
  res.sendStatus(204);
});

app.put('/qa/answers/:answer_id/helpful', (req, res, next) => {
  const answerID = req.params.answer_id;
  console.log(answerID);
  res.sendStatus(204);
});

app.put('/qa/answers/:answer_id/report', (req, res, next) => {
  const answerID = req.params.answer_id;
  console.log(answerID);
  res.sendStatus(204);
});

module.exports = app;
