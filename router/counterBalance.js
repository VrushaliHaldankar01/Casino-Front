const express = require('express');
const counterBalanceService = require('../service/counterBalance');
const router = express.Router();

// Get current balance at the counter
router.get('/:counter_id/balance', counterBalanceService.getCurrentBalance);

// Add chips to a counter
router.post('/:counter_id/balance/add-chips', counterBalanceService.addChipsToCounter);

// Add cash to a counter
router.post('/:counter_id/balance/add-cash', counterBalanceService.addCashToCounter);

module.exports = router;
