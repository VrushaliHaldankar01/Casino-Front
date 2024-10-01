const { DataTypes } = require('sequelize');
const sequelize = require('../utils/configdb'); 

const Vault = sequelize.define('Vault', {
    vault_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    denomination_type: {
      type: DataTypes.ENUM('chip', 'cash'),
      allowNull: false
    },
    denomination_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false  // Common field for both chips and cash
    },
    chip_qty: {
      type: DataTypes.INTEGER,
      allowNull: true  // Used only for chips, NULL for cash
    },
    chip_image: {
      type: DataTypes.STRING(255),
      allowNull: true  // Nullable for cash
    }
  }, {
    timestamps: true,
  });  

module.exports = Vault;
