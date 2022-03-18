const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// const Strains = require('../lib/models/Strain');

describe('cannabis route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should fetch all strains from cannabis table', async () => {
    const res = await request(app).get('/api/v1/cannabis');
    expect(res.body).toEqual({ strain: 'og kush' });
  });
});
