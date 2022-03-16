const { Router } = require('express');

const Boxer = require('../models/Boxer');

module.exports = Router().post('/', async (req, res) => {
  const boxer = await Boxer.insert({
    name: req.body.name,
    wins: req.body.wins,
    losses: req.body.losses,
  });
  res.send(boxer);
});
