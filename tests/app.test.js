const app = require('../server/app.js');
const request = require('supertest');
const sinon = require('sinon');
const queries = require('../server/queries.js');

describe('GET /qa/questions', () => {
  afterEach(() => {
    sinon.restore(); // Restore the original query function after each test
  });

  it('should call queries.getQuestions with the correct parameters', async () => {
    const mockResults = { rows: [{ /* mock results */ }] };
    const stub = sinon.stub(queries, 'getQuestions').yields(null, mockResults);

    const response = await request(app).get('/qa/questions?product_id=2');

    expect(stub.calledOnce).toBe(true);
    expect(stub.firstCall.args[1]).toEqual('2');
    expect(stub.firstCall.args[2]).toEqual(5);
    expect(stub.firstCall.args[3]).toEqual(1);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResults.rows[0]);
  });

  it('should return 500 status code when product_id is null', async () => {
    const stub = sinon.stub(queries, 'getQuestions');

    const response = await request(app).get('/qa/questions?product_id=null');

    expect(stub.called).toBe(false); // Make sure the query function is not called
    expect(response.statusCode).toBe(500);
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
        photos: ['https://unsplash.com/photos/YdAqiUkUoWA'],
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