const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configurazione database
const sequelize = new Sequelize(
  process.env.DB_NAME || 'integrationdb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Giovanni',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test della connessione
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connessione al database PostgreSQL stabilita con successo.');
  } catch (error) {
    console.error('Impossibile connettersi al database:', error);
  }
};

// Esporta gli oggetti Sequelize
module.exports = {
  sequelize,
  Sequelize,
  testConnection
}; 