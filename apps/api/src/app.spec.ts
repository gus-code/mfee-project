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
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toEqual('User registered successfully');

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
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);

        done();
      });
  });

  test('it should create a category', (done) => {
    request(app)
      .post('/api/categories')
      .set('authorization', 'Bearer 12345')
      .send({
        name: 'Category'
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual('Category');

        done();
      });
  });

  test('it should return 404 trying getting a category by id', (done) => {
    request(app)
      .get('/api/categories/123')
      .set('authorization', 'Bearer 12345')
      .then((response) => {
        expect(response.statusCode).toBe(404);

        done();
      });
  });
});
