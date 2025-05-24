require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models/db');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/data', apiRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API funzionante' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Si è verificato un errore sul server!' });
});

// Sync database and start server
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database connesso correttamente');
    
    app.listen(PORT, () => {
      console.log(`Server in esecuzione sulla porta ${PORT}`);
    });
  } catch (error) {
    console.error('Impossibile connettersi al database:', error);
  }
};

startServer(); 