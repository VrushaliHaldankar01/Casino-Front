const express = require('express');
const userService = require('../service/user');
const router = express.Router();

// Register a new user
router.post('/auth/register', userService.registerUser);

// Authenticate user and return JWT
router.post('/auth/login', userService.loginUser);

module.exports = router;
