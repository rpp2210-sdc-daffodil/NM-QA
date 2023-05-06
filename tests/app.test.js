const app = require('../server/app.js');
const request = require('supertest');

describe('GET /qa/questions', () => {
  it('should return 200 status code', async () => {
    const response = await request(app).get('/qa/questions/123');
    expect(response.headers)
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /qa/questions/:question_id/answers', () => {
  it('should return 200 status code', async () => {
    const response = await request(app).get('/qa/questions/123/answers');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /qa/questions', () => {
  it('should return 201 status code', async () => {
    const response = await request(app)
      .post('/qa/questions')
      .send({
        body: 'test question',
        name: 'test name',
        email: 'test@test.com',
        product_id: 123,
      });
    expect(response.statusCode).toBe(201);
  });
});

describe('POST /qa/questions/:question_id/answers', () => {
  it('should return 201 status code', async () => {
    const response = await request(app)
      .post('/qa/questions/123/answers')
      .send({
        body: 'test answer',
        name: 'test name',
        email: 'test@test.com',
        photos: [],
      });
    expect(response.statusCode).toBe(201);
  });
});

describe('PUT /qa/questions/:question_id/helpful', () => {
  it('should return 204 status code', async () => {
    const response = await request(app).put('/qa/questions/123/helpful');
    expect(response.statusCode).toBe(204);
  });
});

describe('PUT /qa/questions/:question_id/report', () => {
  it('should return 204 status code', async () => {
    const response = await request(app).put('/qa/questions/123/report');
    expect(response.statusCode).toBe(204);
  });
});

describe('PUT /qa/answers/:answer_id/helpful', () => {
  it('should return 204 status code', async () => {
    const response = await request(app).put('/qa/answers/123/helpful');
    expect(response.statusCode).toBe(204);
  });
});

describe('PUT /qa/answers/:answer_id/report', () => {
  it('should return 204 status code', async () => {
    const response = await request(app).put('/qa/answers/123/report');
    expect(response.statusCode).toBe(204);
  });
});