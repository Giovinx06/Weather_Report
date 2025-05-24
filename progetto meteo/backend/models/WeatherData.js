const { sequelize, Sequelize } = require('./db');

const WeatherData = sequelize.define('WeatherData', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  temperature: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  humidity: {
    type: Sequelize.INTEGER
  },
  windSpeed: {
    type: Sequelize.FLOAT
  },
  description: {
    type: Sequelize.STRING
  },
  icon: {
    type: Sequelize.STRING
  },
  fetchDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: true
});

module.exports = WeatherData; 