import request from 'supertest';

import app from './app';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secretOrPublicKey, callback) => {
    return callback(null, { sub: 'user_id' });
  })
}));

describe('/api/auth', () => {
  test('it should register a user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'mfee-test',
        password: 'Aa$123'
      })
      .then((response) => {
        const jsonResponse = JSON.parse(response.text);

        expect(response.statusCode).toBe(201);
        expect(jsonResponse.message).toEqual('User registered successfully');

        done();
      });
  });
});

describe('/api/categories', () => {
  test('it should get all the categories', (done) => {
    request(app)
      .get('/api/categories')
      .set('authorization', 'Bearer 12345')
      .then((response) => {
        const jsonResponse = JSON.parse(response.text);

        expect(response.statusCode).toBe(200);
        expect(jsonResponse).toEqual([]);

        done();
      });
  });
});
