const CounterBalance = require('../models/counterBalances');

// Get current balance
const getCurrentBalance = async (req, res) => {
    const { counter_id } = req.params;

    try {
        const balance = await CounterBalance.findAll({ where: { counter_id } });
        res.json(balance);
    } catch (error) {
        console.error('Error fetching counter balance:', error);
        res.status(500).send('Server Error');
    }
};

// Add chips to a counter
const addChipsToCounter = async (req, res) => {
    const { counter_id } = req.params;
    const { chip_id, chip_qty } = req.body;

    try {
        const balance = await CounterBalance.findOne({ where: { counter_id, chip_id } });
        if (balance) {
            balance.chip_qty += chip_qty; // Update existing quantity
            await balance.save();
        } else {
            // Create a new balance entry if not existing
            await CounterBalance.create({ counter_id, chip_id, chip_qty });
        }
        res.status(200).json({ message: 'Chips added successfully' });
    } catch (error) {
        console.error('Error adding chips to counter:', error);
        res.status(500).send('Server Error');
    }
};

// Add cash to a counter
const addCashToCounter = async (req, res) => {
    const { counter_id } = req.params;
    const { cash_value } = req.body;

    try {
        const balance = await CounterBalance.findOne({ where: { counter_id, chip_id: null } }); // Assuming cash is represented with null chip_id
        if (balance) {
            balance.cash_value += cash_value; // Update existing cash balance
            await balance.save();
        } else {
            // Create a new balance entry if not existing
            await CounterBalance.create({ counter_id, cash_value });
        }
        res.status(200).json({ message: 'Cash added successfully' });
    } catch (error) {
        console.error('Error adding cash to counter:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getCurrentBalance, addChipsToCounter, addCashToCounter };
