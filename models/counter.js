const { DataTypes } = require('sequelize');
const sequelize = require('../utils/configdb'); 

const Counter = sequelize.define('Counter', {
    counter_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    counter_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    counter_ip: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
  },
  });

module.exports = Counter;