const { DataTypes } = require('sequelize');
const sequelize = require('../utils/configdb'); // Import Sequelize instance

// Define the User model
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'User', // Ensure the table name is singular 'User' instead of pluralized 'Users'
    timestamps: false, // If you don’t want Sequelize to automatically add timestamps
  }
);

module.exports = User;
