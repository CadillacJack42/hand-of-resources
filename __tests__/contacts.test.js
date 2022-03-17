const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const Contact = require('../lib/models/Contact');

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

  it('Should fetch a list of contacts', async () => {
    const contact = await Contact.insert({
      first_name: 'Cadillac',
      last_name: 'Jack',
    });
    const otherContact = await Contact.insert({
      first_name: 'Albert',
      last_name: 'Einstein',
    });

    const expected = [
      {
        ...contact,
      },
      {
        ...otherContact,
      },
    ];
    const res = await request(app).get('/api/v1/contacts/contacts');
    expect(res.body).toEqual(expected);
  });

  it('Should fetch single contact based on id', async () => {
    const contact = await Contact.insert({
      first_name: 'Nikola',
      last_name: 'Tesla',
    });

    const expected = {
      id: expect.any(String),
      user_id: expect.any(String),
      first_name: 'Nikola',
      last_name: 'Tesla',
    };

    const res = await request(app).get(`/api/v1/contacts/${contact.id}`);
    expect(res.body).toEqual(expected);
  });
});
