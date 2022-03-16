const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const Boxer = require('../lib/models/Boxer');

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

  it('Should fetch a list of all boxers', async () => {
    const boxer = await Boxer.insert({
      name: 'Mike Tyson',
      wins: 50,
      losses: 6,
    });
    const boxerTwo = await Boxer.insert({
      name: 'Lennox Lewis',
      wins: 41,
      losses: 2,
    });

    const expected = [
      {
        ...boxer,
      },
      {
        ...boxerTwo,
      },
    ];
    const res = await request(app).get('/api/v1/boxers/boxers');
    expect(res.body).toEqual(expected);
  });

  it('Should fetch a single boxer by id', async () => {
    const boxer = await Boxer.insert({
      name: 'Mike Tyson',
      wins: 50,
      losses: 6,
    });
    const expected = {
      ...boxer,
    };
    console.log('BOXER ID: ', boxer);

    const res = await request(app).get(`/api/v1/boxers/${boxer.id}`);
    expect(res.body).toEqual(expected);
  });

  it('Should update a boxer by id', async () => {
    const boxer = await Boxer.insert({
      name: 'Buster Duglass',
      wins: 38,
      losses: 6,
    });

    const expected = {
      id: expect.any(String),
      name: 'Buster Douglas',
      wins: 38,
      losses: 6,
    };

    const res = await request(app)
      .patch(`/api/v1/boxers/${boxer.id}`)
      .send({ name: 'Buster Douglas' });
    expect(res.body).toEqual(expected);
  });
});
