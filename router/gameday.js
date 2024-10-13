// routes/gameday.js
const express = require('express');
const router = express.Router();
const gamedayService = require('../service/gameday');
const Gameday = require('../models/gameday');

// Start Gameday
router.post('/start', async (req, res) => {
    const { counter, startdatetime, cashier_id, supervisorUsername, supervisorPassword } = req.body;

    try {
        const newGameday = await gamedayService.startGameday({
            counter,
            startdatetime,
            supervisorUsername,
            cashier_id,
            supervisorPassword,
        });
        res.status(201).json(newGameday);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// End Gameday
router.post('/end/:id', async (req, res) => {
    const gamedayId = req.params.id;
    const { supervisorUsername, supervisorPassword } = req.body;

    try {
        const endedGameday = await gamedayService.endGameday(gamedayId, supervisorUsername, supervisorPassword);
        res.status(200).json(endedGameday);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Active Gameday
router.get('/active', async (req, res) => {
    try {
        const activeGameday = await Gameday.findOne({ where: { enddatetime: null } });
        res.json(activeGameday);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching active gameday' });
    }
});

module.exports = router;
