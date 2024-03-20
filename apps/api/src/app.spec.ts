import request from 'supertest';

import app from './app';

describe('/api/auth', () => {
  test('it should register a user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'mfee-test',
        password: 'Aa$123'
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });
});
