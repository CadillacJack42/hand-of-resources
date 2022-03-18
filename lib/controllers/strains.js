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
  })

  .get('/:id', async (req, res) => {
    const strain = await Strain.getById(req.params.id);
    res.send(strain);
  })

  .patch('/:id', async (req, res) => {
    const strain = await Strain.updateById(req.params.id, req.body);
    res.send(strain);
  });
