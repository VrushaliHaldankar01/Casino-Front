const { DataTypes } = require('sequelize');
const sequelize = require('../utils/configdb');

const Gameday = sequelize.define(
  'Gameday',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startdatetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enddatetime: {
      type: DataTypes.DATE,
      allowNull: true, // Null means game is still ongoing
    },
    supervisor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Use the table name as string
        key: 'user_id',
      },
    },
    cashier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Use the table name as string
        key: 'user_id',
      },
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Gameday;
