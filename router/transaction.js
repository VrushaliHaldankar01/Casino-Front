const express = require('express');
const transactionService = require('../service/transaction');
const router = express.Router();

// Get all transactions with pagination
router.get('/', transactionService.getAllTransactions);

// Add a new transaction
router.post('/add', transactionService.addTransaction);

// Approve a transaction
router.post('/:transaction_id/approve', transactionService.approveTransaction);

module.exports = router;
