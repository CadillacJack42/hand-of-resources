const { Router } = require('express');

const Contatct = require('../models/Contacts');

module.exports = Router().post('/', async (req, res) => {
  const contact = await Contact.insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  res.send(contact);
});
