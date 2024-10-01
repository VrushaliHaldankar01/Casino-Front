const Counter = require('../models/counters');

// Get all counters
const getAllCounters = async (req, res) => {
    try {
        const counters = await Counter.findAll();
        res.json(counters);
    } catch (error) {
        console.error('Error fetching counters:', error);
        res.status(500).send('Server Error');
    }
};

const addCounter = async (req, res) => {
    const { counter_name, counter_ip } = req.body;

    try {
        const newCounter = await Counter.create({ counter_name, counter_ip });
        res.status(201).json(newCounter);
    } catch (error) {
        logger.error('Error adding counter:', error);
        res.status(500).send('Server Error');
    }
};

// Update Counter
const updateCounter = async (req, res) => {
    const { counter_id } = req.params;
    const { counter_name, counter_ip } = req.body;

    try {
        const counter = await Counter.findByPk(counter_id);
        if (!counter) {
            return res.status(404).json({ error: 'Counter not found' });
        }

        counter.counter_name = counter_name || counter.counter_name;
        counter.counter_ip = counter_ip || counter.counter_ip;

        await counter.save();
        res.json(counter);
    } catch (error) {
        logger.error('Error updating counter:', error);
        res.status(500).send('Server Error');
    }
};


module.exports = { getAllCounters, addCounter, updateCounter };
