const express = require('express');
const router = express.Router();
const Property = require('../models/property.model');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;

  const property = new Property({
    name,
    description,
    contact: req.user.email,
    user: req.user._id
  });

  await property.save();
  res.status(201).send(property);
});

router.get('/', async (req, res) => {
  const properties = await Property.find();
  res.send(properties);
});

router.delete('/:id', auth, async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) return res.status(404).send('Property not found.');
  if (property.user.toString() !== req.user._id) return res.status(401).send('User not authorized.');

  await property.remove();
  res.send('Property removed.');
});

module.exports = router;
