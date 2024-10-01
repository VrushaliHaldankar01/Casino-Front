const { DataTypes } = require('sequelize');
const sequelize = require('../utils/configdb'); 

const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,  // Optional, but if used, it should be unique
      validate: {
        isEmail: true  // Validates email format
      }
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: true,  // Optional, if you need to track phone numbers uniquely
      validate: {
        len: [10, 15]  // Ensure valid phone number length
      }
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    loyalty_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    bonus_balance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00  // Track bonus amounts separately
    }
  }, {
    timestamps: true,
    paranoid: true  // Soft delete
  });

  module.exports = Customer;
