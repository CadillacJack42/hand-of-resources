const { Router } = require('express');

const Boxer = require('../models/Boxer');

module.exports = Router()
  .post('/', async (req, res) => {
    const boxer = await Boxer.insert({
      name: req.body.name,
      wins: req.body.wins,
      losses: req.body.losses,
    });
    res.send(boxer);
  })

  .get('/boxers', async (req, res) => {
    const boxer = await Boxer.getAllBoxers();
    res.send(boxer);
  })

  .get('/:id', async (req, res) => {
    const boxer = await Boxer.getById(req.params.id);
    res.send(boxer);
  })

  .patch('/:id', async (req, res) => {
    const boxer = await Boxer.updateById(req.params.id);
    res.send(boxer);
  });
