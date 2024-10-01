const express = require('express');
const customerService = require('../service/customer');
const router = express.Router();

// Create a new customer
router.post('/', customerService.createCustomer);

// Get all customers
router.get('/', customerService.getAllCustomers);

// Get a specific customer
router.get('/:customer_id', customerService.getCustomer);

// Update a customer
router.put('/:customer_id', customerService.updateCustomer);

// Soft delete a customer
router.delete('/:customer_id', customerService.deleteCustomer);

// Get transactions for a specific customer
router.get('/:customer_id/transactions', customerService.getCustomerTransactions);

module.exports = router;
