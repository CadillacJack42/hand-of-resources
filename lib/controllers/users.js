const { Router } = require('express');

const User = require('../models/User');

module.exports = Router()
  .post('/', async (req, res) => {
    const user = await User.insert(req.body);
    res.send(user);
  })

  .get('/', async (req, res) => {
    const users = await User.getAllUsers();
    res.send(users);
  })

  .get('/:id', async (req, res) => {
    const user = await User.getUserById(req.params.id);
    res.send(user);
  })

  .patch('/:id', async (req, res) => {
    const user = await User.updateById(req.params.id, req.body);
    res.send(user);
  });
