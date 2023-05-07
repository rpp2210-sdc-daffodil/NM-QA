// const fs = require('fs');
// const { parse } = require('csv-parse');
// const path = require('path');
// const { Client } = require('pg');

// const data = [];

// const db = new Client({
//   user: 'nickmonteleone',
//   host: 'localhost',
//   database: 'qanda',
//   port: '5432'
// });

// db.connect();


// const addQuestion = async (question) => {
//   const query = `INSERT INTO questions
//       (question_body,
//         question_date,
//         asker_name,
//         asker_email,
//         question_helpfulness,
//         product_id,
//         reported) VALUES
//       ($1, $2, $3, $4, $5, $6, $7)`;
//   const values = [
//     question.body,
//     question.date_written,
//     question.asker_name,
//     question.asker_email,
//     question.helpful,
//     question.product_id,
//     question.reported
//   ];
//   await db.query(query, values, (err, res) => {
//     if (err) {
//       throw err;
//     } else {
//       if ((question.id/3518963) > .25 && (question.id/3518963) < .25002) {
//         console.log('quarter done');
//       } else if ((question.id/3518963) > .5 && (question.id/3518963) < .5002) {
//         console.log('half done');
//       } else if ((question.id/3518963) > .75 && (question.id/3518963) < .75002) {
//         console.log('3 quarters done');
//       } else if (question.id/3518963 === 1) {
//         console.log('done');
//       }
//     }
//   });
// }

// const addAnswer = async (answer) => {
//   const query = `INSERT INTO answers
//       (question_id,
//         body,
//         date,
//         answerer_name,
//         answerer_email,
//         helpfulness,
//         reported) VALUES
//       ($1, $2, $3, $4, $5, $6, $7)`;
//   //id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
//   const values = [
//     answer.question_id,
//     answer.body,
//     answer.date_written,
//     answer.answerer_name,
//     answer.answerer_email,
//     answer.helpful,
//     answer.reported
//   ];
//   await db.query(query, values, (err, res) => {
//     if (err) {
//       throw err;
//     } else {
//       if ((answer.id/6879306) > .25 && (answer.id/6879306) < .25002) {
//         console.log('quarter done');
//       } else if ((answer.id/6879306) > .5 && (answer.id/6879306) < .5002) {
//         console.log('half done');
//       } else if ((answer.id/6879306) > .75 && (answer.id/6879306) < .75002) {
//         console.log('3 quarters done');
//       } else if (answer.id/6879306 === 1) {
//         console.log('done');
//       }
//     }
//   });
// }

// const readAndWriteCSV = (dir, addFunc) => {
//   fs.createReadStream(path.join(__dirname, dir))
//     .pipe(
//       parse({
//         delimiter: ",",
//         columns: true,
//         ltrim: true,
//       })
//     )
//     .on("data", function (row) {
//       // This will push the object row into the array
//       // console.log(row);
//       addFunc(row);
//     })
//     .on("error", function (error) {
//       console.log(error.message);
//     })
//     .on("end", function () {
//       // Here log the result array
//       console.log("parsed csv data.");
//       // addQuestions(() => {
//       //   db.query("SELECT * from questions WHERE question_id = 1;", (err, res) => {
//       //     if (err) throw err;
//       //     console.log(res.rows);
//       //     db.end();
//       //   });
//       // });
//     });
// }


//This code was a good attempt and worked for the questions after many hours, but takes way too long
// readAndWriteCSV('./data/answers.csv', addAnswer);



// db.query(`COPY tablename(keys)
// FROM 'path/to/data.csv'
// DELIMITER ','
// CSV HEADER;`)


// db.query("INSERT INTO photos (url) VALUES ('https://example.com/photo.jpg');", (err, res) => {
//   if (err) throw err;
// });

// db.query("SELECT * from photos;", (err, res) => {
//   if (err) throw err;
//   console.log(res.rows);
//   db.end();
// });






