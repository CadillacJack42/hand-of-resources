const { Router } = require('express');

const Car = require('../models/Car');

module.exports = Router()
  .post('/', async (req, res) => {
    const car = await Car.insert({
      make: req.body.make,
      model: req.body.model,
      manual_transmission: req.body.manual_transmission,
    });

    res.send(car);
  })

  .get('/cars', async (req, res) => {
    const car = await Car.getAllCars();
    res.send(car);
  })

  .get('/:id', async (req, res) => {
    const car = await Car.getCarById(req.params.id);
    res.send(car);
  });
