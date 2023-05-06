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
              WHERE a.question_id = q.question_id
            )
          )
      ) AS results
    FROM (
      SELECT
        *,
        ROW_NUMBER() OVER (ORDER BY question_id ASC) AS rn
      FROM questions
      WHERE product_id = ${id}
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
        json_agg(
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
        ) as results
        FROM (
          SELECT
            *,
            ROW_NUMBER() OVER (ORDER BY answer_id ASC) AS rn
          FROM answers
          WHERE question_id = ${id}
        ) a
        WHERE rn <= ${count}`,
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
