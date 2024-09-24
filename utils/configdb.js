const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('Casino', 'postgres', 'admin', {
  host: 'localhost', // or the host address where your PostgreSQL is running
  dialect: 'postgres',
  port: 5432, // Default PostgreSQL port
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
