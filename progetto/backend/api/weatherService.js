const axios = require('axios');
const WeatherData = require('../models/WeatherData');
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'd5572c2f7926416d94763128251605';
const WEATHER_API_BASE_URL = 'http://api.weatherapi.com/v1';

// Funzione per recuperare dati meteo per una città
const fetchWeatherData = async (city) => {
  try {
    const url = `${WEATHER_API_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}`;
    const response = await axios.get(url);
    
    if (response.status === 200) {
      const data = response.data;
      
      // Crea un record nel database
      const weatherData = await WeatherData.create({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
        fetchDate: new Date()
      });
      
      return weatherData;
    }
    
    throw new Error('Errore durante il recupero dei dati meteo');
  } catch (error) {
    console.error('Errore nel servizio meteo:', error.message);
    throw error;
  }
};

// Funzione per recuperare dati meteo per più città
const fetchMultipleCitiesWeather = async (cities) => {
  const results = [];
  const errors = [];
  
  for (const city of cities) {
    try {
      const weatherData = await fetchWeatherData(city);
      results.push(weatherData);
    } catch (error) {
      errors.push({ city, error: error.message });
    }
  }
  
  return { results, errors };
};

// Funzione per recuperare dati storici dal database
const getWeatherHistory = async (city, limit = 10) => {
  try {
    const history = await WeatherData.findAll({
      where: {
        city: city
      },
      order: [['fetchDate', 'DESC']],
      limit: limit
    });
    
    return history;
  } catch (error) {
    console.error('Errore nel recupero storico dati meteo:', error.message);
    throw error;
  }
};

module.exports = {
  fetchWeatherData,
  fetchMultipleCitiesWeather,
  getWeatherHistory
}; 