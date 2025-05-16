import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

// Configura axios con l'URL di base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Intercettore per aggiungere il token di autenticazione
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Servizi di autenticazione
export const authService = {
  login(credentials) {
    return apiClient.post('/auth/login', credentials)
  },
  register(user) {
    return apiClient.post('/auth/register', user)
  }
}

// Servizi per gli utenti
export const userService = {
  getUsers() {
    return apiClient.get('/users')
  },
  getUser(id) {
    return apiClient.get(`/users/${id}`)
  },
  updateUser(id, userData) {
    return apiClient.put(`/users/${id}`, userData)
  },
  changePassword(id, passwords) {
    return apiClient.put(`/users/${id}/change-password`, passwords)
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`)
  }
}

// Servizi per i dati meteo
export const weatherService = {
  getWeatherData() {
    return apiClient.get('/data/weather')
  },
  getCityWeather(city) {
    return apiClient.get(`/data/weather/${city}`)
  },
  getCityWeatherHistory(city, limit) {
    return apiClient.get(`/data/weather/${city}/history?limit=${limit || 10}`)
  },
  fetchNewWeather(city) {
    return apiClient.post('/data/weather/fetch', { city })
  },
  fetchMultipleCitiesWeather(cities) {
    return apiClient.post('/data/weather/fetch-multiple', { cities })
  }
}

export default {
  auth: authService,
  users: userService,
  weather: weatherService
} 