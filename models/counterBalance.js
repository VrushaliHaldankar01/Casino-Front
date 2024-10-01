const { DataTypes } = require('sequelize');
const sequelize = require('../utils/configdb'); 

// Import the required models
const Counter = require('./counter'); // Adjust the path if necessary
const Vault = require('./vault'); // Adjust the path if necessary

const CounterBalance = sequelize.define('CounterBalance', {
  counter_balance_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  counter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Counter,
      key: 'counter_id'
    }
  },
  vault_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vault,
      key: 'vault_id'
    }
  },
  balance_qty: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

// Optionally set up associations here if needed
CounterBalance.associate = (models) => {
  CounterBalance.belongsTo(models.Counter, { foreignKey: 'counter_id' });
  CounterBalance.belongsTo(models.Vault, { foreignKey: 'vault_id' });
};

module.exports = CounterBalance;
