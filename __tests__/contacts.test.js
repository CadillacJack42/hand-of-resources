const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// const Contact = require('../lib/models/Contact');

describe('string', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should create a new contact in the contacts table', async () => {
    const res = await request(app).post('/api/v1/contacts').send({
      first_name: 'Hunter',
      last_name: 'Thompson',
    });
    console.log('TEST RESPONSE', res.body);

    const expected = {
      first_name: 'Hunter',
      last_name: 'Thompson',
      id: expect.any(String),
      user_id: expect.any(String),
    };
    expect(res.body).toEqual(expected);
  });
});
