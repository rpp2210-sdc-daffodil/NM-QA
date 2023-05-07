/* eslint-disable no-unused-vars */
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

app.get('/qa/questions', (req, res, next) => {
  const productID = req.query.product_id;
  const count = req.query.count ? req.query.count : 5;
  const page = req.query.page ? req.query.page : 1;

  queries.getQuestions(db, productID, count, page, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      // console.log(results.rows[0].results.length);
      res.json(results.rows[0]);
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
      res.json(results.rows[0]);
    }
  });
});

app.post('/qa/questions', (req, res, next) => {
  const { body } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const productID = req.body.product_id;

  queries.addQuestion(db, productID, body, name, email, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(501);
    } else {
      console.log(results);
      res.sendStatus(201);
    }
  });
});

app.post('/qa/questions/:question_id/answers', (req, res, next) => {
  const questionID = req.params.question_id;
  const { body } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { photos } = req.body;

  queries.addAnswer(db, questionID, body, name, email, photos, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(501);
    } else {
      console.log(results);
      res.sendStatus(201);
    }
  });
});

app.put('/qa/questions/:question_id/helpful', (req, res, next) => {
  const questionID = req.params.question_id;
  queries.markQHelpful(db, questionID, (err, results) => {
    if (err) {
      console.log(results);
      res.sendStatus(505);
    } else {
      console.log(results);
      res.sendStatus(204);
    }
  });
});

app.put('/qa/questions/:question_id/report', (req, res, next) => {
  const questionID = req.params.question_id;
  queries.markQReport(db, questionID, (err, results) => {
    if (err) {
      console.log(results);
      res.sendStatus(505);
    } else {
      console.log(results);
      res.sendStatus(204);
    }
  });
});

app.put('/qa/answers/:answer_id/helpful', (req, res, next) => {
  const answerID = req.params.answer_id;
  queries.markAHelpful(db, answerID, (err, results) => {
    if (err) {
      console.log(results);
      res.sendStatus(505);
    } else {
      console.log(results);
      res.sendStatus(204);
    }
  });
});

app.put('/qa/answers/:answer_id/report', (req, res, next) => {
  const answerID = req.params.answer_id;
  queries.markAReport(db, answerID, (err, results) => {
    if (err) {
      console.log(results);
      res.sendStatus(505);
    } else {
      console.log(results);
      res.sendStatus(204);
    }
  });
});

module.exports = app;
