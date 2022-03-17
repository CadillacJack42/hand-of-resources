const { Router } = require('express');

const Contact = require('../models/Contact');

module.exports = Router().post('/', async (req, res) => {
  const contact = await Contact.insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  console.log('CONTROLLER CONTACT', contact);
  res.send(contact);
});
