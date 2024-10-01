const Customer = require('../models/customer');
const CustomerTransaction = require('../models/customerTransactions');

// Create a new customer
const createCustomer = async (req, res) => {
    const { first_name, last_name, email, phone_number } = req.body;

    try {
        const newCustomer = await Customer.create({ first_name, last_name, email, phone_number });
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).send('Server Error');
    }
};

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).send('Server Error');
    }
};

// Get a specific customer
const getCustomer = async (req, res) => {
    const { customer_id } = req.params;

    try {
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).send('Server Error');
    }
};

// Update a customer
const updateCustomer = async (req, res) => {
    const { customer_id } = req.params;
    const { first_name, last_name, email, phone_number } = req.body;

    try {
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        customer.first_name = first_name || customer.first_name;
        customer.last_name = last_name || customer.last_name;
        customer.email = email || customer.email;
        customer.phone_number = phone_number || customer.phone_number;

        await customer.save();
        res.json(customer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).send('Server Error');
    }
};

// Soft delete a customer
const deleteCustomer = async (req, res) => {
    const { customer_id } = req.params;

    try {
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        await customer.destroy();
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).send('Server Error');
    }
};

// Get transactions for a specific customer
const getCustomerTransactions = async (req, res) => {
    const { customer_id } = req.params;

    try {
        const transactions = await CustomerTransaction.findAll({ where: { customer_id } });
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching customer transactions:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = { createCustomer, getAllCustomers, getCustomer, updateCustomer, deleteCustomer, getCustomerTransactions };
