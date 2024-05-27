const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, isSeller } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already exists.');

  user = new User({ firstName, lastName, email, phoneNumber, password, isSeller });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await user.matchPassword(password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.send({ token });
});

module.exports = router;
