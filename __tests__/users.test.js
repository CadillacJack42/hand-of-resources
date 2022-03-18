const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const User = require('../lib/models/User');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should insert a new user into the users table', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ username: 'CadillacJack', email: 'one@two.com' });

    const expected = {
      id: expect.any(String),
      created_at: expect.any(String),
      user_id: expect.any(String),
      username: 'CadillacJack',
      email: 'one@two.com',
    };

    expect(res.body).toEqual(expected);
  });

  it('Should fetch all users from db', async () => {
    const user = await User.insert({
      username: 'Yo Mama',
      email: 'yomama@jokes.com',
    });
    const userTwo = await User.insert({
      username: 'Yo Yo Ma',
      email: 'yoyomami@jokes.com',
    });
    const expected = [
      {
        ...user,
      },
      {
        ...userTwo,
      },
    ];

    const res = await request(app).get('/api/v1/users');
    expect(res.body).toEqual(expected);
  });
});
