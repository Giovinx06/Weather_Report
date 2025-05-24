import { createStore } from 'vuex'
import axios from 'axios'

// API base URL
const API_URL = 'http://localhost:3000/api'

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user') || '{}'),
    weatherData: []
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    currentUser: state => state.user,
    isAdmin: state => state.user && state.user.role === 'admin',
    weatherData: state => state.weatherData
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, { token, user }) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    AUTH_ERROR(state) {
      state.status = 'error'
    },
    LOGOUT(state) {
      state.status = ''
      state.token = ''
      state.user = {}
    },
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data
    }
  },
  actions: {
    // Login
    login({ commit }, userData) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios.post(`${API_URL}/auth/login`, { 
          username: userData.username, 
          password: userData.password 
        })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            
            // Se rememberMe è true, usa localStorage (persiste anche dopo chiusura browser)
            // Altrimenti usa sessionStorage (persiste solo per la sessione corrente)
            const storage = userData.rememberMe ? localStorage : sessionStorage
            
            storage.setItem('token', token)
            storage.setItem('user', JSON.stringify(user))
            
            // Imposta il token nell'header per le future richieste API
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('AUTH_SUCCESS', { token, user })
            resolve(resp)
          })
          .catch(err => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
            reject(err)
          })
      })
    },
    
    // Registrazione
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios.post(`${API_URL}/auth/register`, user)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('AUTH_ERROR')
            reject(err)
          })
      })
    },
    
    // Logout
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('LOGOUT')
        
        // Salva le variabili rememberCredentials e savedUsername
        const rememberCredentials = localStorage.getItem('rememberCredentials')
        const savedUsername = localStorage.getItem('savedUsername')
        
        // Pulisci localStorage e sessionStorage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        
        // Ripristina le credenziali salvate se necessario
        if (rememberCredentials === 'true' && savedUsername) {
          localStorage.setItem('rememberCredentials', rememberCredentials)
          localStorage.setItem('savedUsername', savedUsername)
        }
        
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    
    // Recupera dati meteo
    fetchWeatherData({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/data/weather`)
          .then(resp => {
            commit('SET_WEATHER_DATA', resp.data)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    // Recupera nuovi dati meteo da API esterna
    fetchNewWeatherData(_, city) {
      return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/data/weather/fetch`, { city })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}) 