/* eslint-disable quotes */
module.exports = {
  getQuestions: (db, id, count, page, cb) => {
    db.query(
      `SELECT
      q.product_id,
      json_agg(
          json_build_object(
            'question_id', q.question_id,
            'question_body', q.question_body,
            'question_date', q.question_date,
            'asker_name', q.asker_name,
            'question_helpfulness', q.question_helpfulness,
            'reported', q.reported,
            'answers', (
              SELECT COALESCE(json_object_agg(
                a.answer_id, json_build_object(
                  'id', a.answer_id,
                  'body', a.body,
                  'date', a.date_written,
                  'answerer_name', a.answerer_name,
                  'helpfulness', a.helpful,
                  'photos', (
                    SELECT COALESCE(json_agg(
                      json_build_object(
                        'id', p.id,
                        'url', p.url
                      )
                    ), '[]'::json) FROM photos p WHERE p.answer_id = a.answer_id
                  )
                )
              ), '[]'::json)
              FROM answers a
              WHERE a.question_id = q.question_id AND NOT a.reported
            )
          )
      ) AS results
    FROM (
      SELECT
        *,
        ROW_NUMBER() OVER (ORDER BY question_id ASC) AS rn
      FROM questions
      WHERE product_id = ${id} AND NOT reported
    ) q
    WHERE
      q.rn <= ${count}
    GROUP BY
      q.product_id;`,
      (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      },
    );
  },
  getAnswers: (db, id, count, page, cb) => {
    db.query(
      `SELECT
        ${id} as question,
        ${page} as page,
        ${count} as count,
        COALESCE(json_agg(
          json_build_object(
            'answer_id', a.answer_id,
            'body', a.body,
            'date', a.date_written,
            'answerer_name', a.answerer_name,
            'helpfulness', a.helpful,
            'photos', (
              SELECT COALESCE(json_agg(
                json_build_object(
                  'id', p.id,
                  'url', p.url
                )
              ), '[]'::json) FROM photos p WHERE p.answer_id = a.answer_id
            )
          )
        ), '[]'::json) as results
        FROM (
          SELECT
            *,
            ROW_NUMBER() OVER (ORDER BY answer_id ASC) AS rn
          FROM answers
          WHERE question_id = ${id} AND NOT reported
        ) a
        WHERE rn <= ${count};`,
      (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      },
    );
  },
  addQuestion: (db, id, body, name, email, cb) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    db.query(
      `INSERT INTO questions (question_id, product_id, question_body, asker_name, asker_email, question_date)
        VALUES (DEFAULT, $1, $2, $3, $4, $5);`,
      [id, body, name, email, formattedDate],
      (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      },
    );
  },
  addAnswer: (db, id, body, name, email, photos, cb) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    db.query(
      `INSERT INTO answers (answer_id, question_id, body, answerer_name, answerer_email, date_written)
        VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING answer_id;`,
      [id, body, name, email, formattedDate],
      (err, results) => {
        if (err) {
          cb(err);
        } else {
          const insertPromises = photos.map((p) => db.query(
            `INSERT INTO photos (id, answer_id, url) VALUES (DEFAULT, $1, $2);`,
            [results.rows[0].answer_id, p],
          ));
          Promise.all(insertPromises)
            .then(() => {
              cb(null, results);
            })
            .catch((error) => {
              cb(error);
            });
        }
      },
    );
  },
  markQHelpful: (db, id, cb) => {
    db.query(
      `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${id};`,
      (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      },
    );
  },
  markAHelpful: (db, id, cb) => {
    db.query(
      `UPDATE answers SET helpful = helpful + 1 WHERE answer_id = ${id};`,
      (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      },
    );
  },
  markQReport: (db, id, cb) => {
    db.query(
      `UPDATE questions SET reported = true WHERE question_id = ${id};`,
      (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      },
    );
  },
  markAReport: (db, id, cb) => {
    db.query(
      `UPDATE answers SET reported = true WHERE answer_id = ${id};`,
      (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      },
    );
  },
};
