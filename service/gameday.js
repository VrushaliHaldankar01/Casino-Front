// services/gamedayService.js
const Gameday = require('../models/gameday');
const User = require('../models/user'); // Make sure to import the User model
const logger = require('../utils/logger');

// Start Gameday
const startGameday = async (data) => {
    const { counter, startdatetime, supervisorUsername, supervisorPassword, cashier_id } = data;

    if (!counter || !supervisorUsername || !supervisorPassword || !cashier_id) {
        throw new Error('All fields are required to start a gameday');
    }

    try {
        const supervisor = await User.findOne({ where: { username: supervisorUsername } });
        
        // Verify supervisor credentials (you might want to hash password here and compare)
        if (!supervisor || !(await bcrypt.compare(supervisorPassword, supervisor.password))) {
            throw new Error('Invalid supervisor credentials');
        }

        const newGameday = await Gameday.create({
            counter,
            startdatetime: new Date(), // Assuming you want to set the current time as start
            supervisor_id: supervisor.user_id, // Store the supervisor ID
            cashier_id,
        });

        logger.info(`Gameday started: ${newGameday.id}`);
        return newGameday;
    } catch (error) {
        logger.error('Error starting gameday:', error);
        throw new Error('Server Error');
    }
};

// End Gameday
const endGameday = async (id, data) => {
    const { supervisorUsername, supervisorPassword } = data;

    try {
        const supervisor = await User.findOne({ where: { username: supervisorUsername } });
        
        // Verify supervisor credentials
        if (!supervisor || !(await bcrypt.compare(supervisorPassword, supervisor.password))) {
            throw new Error('Invalid supervisor credentials');
        }

        const gameday = await Gameday.findByPk(id);
        if (!gameday) {
            throw new Error('Gameday not found');
        }

        // Update the gameday to set the end datetime
        gameday.enddatetime = new Date(); // Set current date and time as end datetime
        await gameday.save();

        logger.info(`Gameday ended: ${gameday.id}`);
        return gameday;
    } catch (error) {
        logger.error('Error ending gameday:', error);
        throw new Error('Server Error');
    }
};

module.exports = { startGameday, endGameday };
