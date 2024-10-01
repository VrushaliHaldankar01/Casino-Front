const Transaction = require('../models/transactions');

// Get all transactions
const getAllTransactions = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const transactions = await Transaction.findAndCountAll({
            limit: parseInt(limit),
            offset: (page - 1) * limit,
        });
        res.json({
            total: transactions.count,
            pages: Math.ceil(transactions.count / limit),
            data: transactions.rows,
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Server Error');
    }
};


// Add a new transaction
const addTransaction = async (req, res) => {
    const { user_id, counter_id, vault_id, transaction_type, amount } = req.body;

    try {
        // Check if amount exceeds threshold for supervisor approval
        const threshold = 100000; // Example threshold
        const transaction = await Transaction.create({ user_id, counter_id, vault_id, transaction_type, amount });

        if (amount > threshold) {
            // Logic for supervisor approval (can use notifications or additional logic)
            return res.status(201).json({ message: 'Transaction recorded. Awaiting supervisor approval.', transaction });
        }

        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).send('Server Error');
    }
};

// Approve a transaction
const approveTransaction = async (req, res) => {
    const { transaction_id } = req.params;

    try {
        const transaction = await Transaction.findByPk(transaction_id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        transaction.supervisor_approved = true;
        await transaction.save();

        res.json({ message: 'Transaction approved', transaction });
    } catch (error) {
        console.error('Error approving transaction:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getAllTransactions, addTransaction, approveTransaction };
