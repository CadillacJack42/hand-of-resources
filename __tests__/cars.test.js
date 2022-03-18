const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// const Car = require('../lib/models/Car');

describe('Cars tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should insert new row into db', async () => {
    const res = await request(app).post('/api/v1/cars').send({
      make: 'Cadillac',
      model: 'CT6',
      manual_transmission: true,
    });

    const expected = {
      id: expect.any(String),
      make: 'Cadillac',
      model: 'CT6',
      manual_transmission: true,
    };

    expect(res.body).toEqual(expected);
  });
});
