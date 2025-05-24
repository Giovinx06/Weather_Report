const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { verifyToken } = require('../auth/authMiddleware');
const WeatherData = require('../models/WeatherData');
const weatherService = require('../api/weatherService');

const router = express.Router();

// Protezione delle API con autenticazione
router.use(verifyToken);

// Ottieni tutti i dati meteo
router.get('/weather', async (req, res) => {
  try {
    const weatherData = await WeatherData.findAll({
      order: [['fetchDate', 'DESC']],
      limit: 100
    });
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il recupero dei dati meteo' });
  }
});

// Ottieni dati meteo per una città specifica
router.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = await WeatherData.findOne({
      where: { city: city },
      order: [['fetchDate', 'DESC']]
    });
    
    if (!weatherData) {
      return res.status(404).json({ message: 'Dati meteo non trovati per questa città' });
    }
    
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il recupero dei dati meteo' });
  }
});

// Ottieni storico dati meteo per una città
router.get('/weather/:city/history', [
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const city = req.params.city;
    const limit = req.query.limit || 10;
    
    const history = await weatherService.getWeatherHistory(city, limit);
    
    if (history.length === 0) {
      return res.status(404).json({ message: 'Nessun dato storico trovato per questa città' });
    }
    
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il recupero dei dati storici' });
  }
});

// Recupera nuovi dati meteo da API esterna
router.post('/weather/fetch', [
  body('city').notEmpty().withMessage('Nome città richiesto')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { city } = req.body;
    
    const weatherData = await weatherService.fetchWeatherData(city);
    
    res.status(201).json({
      message: 'Dati meteo recuperati con successo',
      data: weatherData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il recupero dei dati meteo' });
  }
});

// Recupera dati meteo per più città
router.post('/weather/fetch-multiple', [
  body('cities').isArray().withMessage('Elenco città richiesto'),
  body('cities.*').notEmpty().withMessage('Nome città non può essere vuoto')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { cities } = req.body;
    
    const results = await weatherService.fetchMultipleCitiesWeather(cities);
    
    res.status(201).json({
      message: 'Dati meteo multipli recuperati con successo',
      results: results.results,
      errors: results.errors
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il recupero dei dati meteo multipli' });
  }
});

module.exports = router; 