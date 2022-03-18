const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const Strain = require('../lib/models/Strain');

describe('cannabis route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should upload a new strain to the db', async () => {
    const res = await request(app)
      .post('/api/v1/cannabis')
      .send({ strain: 'Durban Poison' });

    expect(res.body).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      strain: 'Durban Poison',
    });
  });

  it('Should fetch all strains from cannabis table', async () => {
    await Strain.insert({
      strain: 'Pineapple Express',
    });
    const expected = [
      {
        id: expect.any(String),
        created_at: expect.any(String),
        strain: 'Pineapple Express',
      },
    ];
    const res = await request(app).get('/api/v1/cannabis');
    expect(res.body).toEqual(expected);
  });

  it('Should fetch a single strain based on id', async () => {
    const strain = await Strain.insert({ strain: 'Duct Tape' });

    const expected = {
      id: expect.any(String),
      created_at: expect.any(String),
      strain: 'Duct Tape',
    };

    const res = await request(app).get(`/api/v1/cannabis/${strain.id}`);
    expect(res.body).toEqual(expected);
  });
});
