const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should upload a new boxer to the boxer table', async () => {
    const res = await request(app)
      .post('/api/v1/boxers')
      .send({ name: 'Mike Tyson', wins: 50, losses: 6 });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Mike Tyson',
      wins: 50,
      losses: 6,
    });
  });
});
