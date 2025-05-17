const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add-tecnico', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email già registrata' });
    }

    const newUser = new User({
      username,
      email,
      password,
      role: 'tecnico',
    });

    await newUser.save();
    res.status(201).json({ message: 'Tecnico aggiunto con successo' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
