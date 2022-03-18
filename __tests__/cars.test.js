const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const Car = require('../lib/models/Car');

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
      manual_transmission: false,
    });

    const expected = {
      id: expect.any(String),
      make: 'Cadillac',
      model: 'CT6',
      manual_transmission: false,
    };

    expect(res.body).toEqual(expected);
  });

  it('Should fetch a list of all cars in db', async () => {
    const car = await Car.insert({
      make: 'Cadillac',
      model: 'CT6',
      manual_transmission: false,
    });

    const carTwo = await Car.insert({
      make: 'Cadillac',
      model: 'El Miraj',
      manual_transmission: false,
    });

    const expected = [
      {
        ...car,
      },
      {
        ...carTwo,
      },
    ];

    const res = await request(app).get('/api/v1/cars');
    expect(res.body).toEqual(expected);
  });

  it('Should fetch a single car by id', async () => {
    const car = await Car.insert({
      make: 'Cadillac',
      model: 'DTS',
      manual_transmission: false,
    });
    const res = await request(app).get(`/api/v1/cars/${car.id}`);
    expect(res.body).toEqual(car);
  });

  it('Should update a car based on id', async () => {
    const car = await Car.insert({
      make: 'Cadillac',
      model: 'STS-V',
      manual_transmission: false,
    });
    const updatedCar = {
      manual_transmission: true,
    };
    const expected = {
      id: expect.any(String),
      make: 'Cadillac',
      model: 'STS-V',
      manual_transmission: true,
    };
    const res = await (
      await request(app).patch(`/api/v1/cars/${car.id}`)
    ).send(updatedCar);
    expect(res.body).toEqual(expected);
  });
});
