const { Router } = require('express');

const Contact = require('../models/Contact');

module.exports = Router()
  .post('/', async (req, res) => {
    const contact = await Contact.insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    console.log('CONTROLLER CONTACT', contact);
    res.send(contact);
  })

  .get('/contacts', async (req, res) => {
    const contact = await Contact.getAllContacts();
    res.send(contact);
  })

  .get('/:id', async (req, res) => {
    const contact = await Contact.getById(req.params.id);
    res.send(contact);
  })

  .patch('/:id', async (req, res) => {
    const contact = await Contact.updateById(req.params.id, req.body);
    res.send(contact);
  });
