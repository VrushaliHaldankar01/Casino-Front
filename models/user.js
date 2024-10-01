const { DataTypes } = require('sequelize');
const sequelize = require('../utils/configdb');

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 50], // Ensure username is of valid length
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'cashier', 'supervisor'),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    paranoid: true, // For soft deletes
  }
);

module.exports = User;
