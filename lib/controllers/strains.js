const { Router } = require('express');

const Strain = require('../models/Strain');

module.exports = Router()
  .post('/', async (req, res) => {
    const strain = await Strain.insert({
      strain: req.body.strain,
    });
    res.send(strain);
  })
  .get('/', async (req, res) => {
    const strain = await Strain.getAllStrains();
    res.send(strain);
  });
