const { Router } = require('express');

const Strain = require('../models/Strain');

module.exports = Router().get('/', async (req, res) => {
  const strain = await Strain.getAllStrains();
  res.send(strain);
});
