const { DataTypes } = require('sequelize');
const sequelize = require('../utils/configdb');

// Import the other models
const User = require('./user'); // Make sure the path is correct
const Counter = require('./counter'); // Make sure the path is correct
const Vault = require('./vault'); // Make sure the path is correct

const Transaction = sequelize.define('Transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    counter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Counter,
            key: 'counter_id',
        },
    },
    vault_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Vault,
            key: 'vault_id',
        },
    },
    transaction_type: {
        type: DataTypes.ENUM('withdrawal', 'deposit'),
        allowNull: false,
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    supervisor_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,  // Approval needed for large transactions
    },
}, {
    timestamps: true,
    indexes: [
        {
            fields: ['user_id', 'counter_id', 'vault_id'],
            unique: false,  // Multi-column index to speed up frequent queries
        },
    ],
});

// Optionally, set up associations here if needed
Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
    Transaction.belongsTo(models.Counter, { foreignKey: 'counter_id' });
    Transaction.belongsTo(models.Vault, { foreignKey: 'vault_id' });
};

module.exports = Transaction;
