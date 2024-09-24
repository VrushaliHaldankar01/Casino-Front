const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Sequelize User model

// Create User function
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.SECRET, {
      expiresIn: '1h',
    });

    // Respond with the newly created user and the token
    res.json({ token, newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUser,
};
