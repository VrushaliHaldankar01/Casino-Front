const express = require('express');
const counterService = require('../service/counter');
const router = express.Router();

// Get all counters
router.get('/', counterService.getAllCounters);

// Add a new counter
router.post('/add', counterService.addCounter);

module.exports = router;
