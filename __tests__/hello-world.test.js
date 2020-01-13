const request = require('supertest');
const app = require('../src/app');

it('GET / should respond with Hello world!', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Hello world!');
      done();
    });
});
