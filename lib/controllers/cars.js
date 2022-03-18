const { Router } = require('express');

const Car = require('../models/Car');

module.exports = Router().post('/', async (req, res) => {
  const car = await Car.insert({
    make: 'Cadillac',
    model: 'CT6',
    maunual_transmission: false,
  });

  res.send(car);
});
