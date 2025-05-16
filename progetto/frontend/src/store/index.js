import { createStore } from 'vuex'
import axios from 'axios'

// API base URL
const API_URL = 'http://localhost:3000/api'

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
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
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios.post(`${API_URL}/auth/login`, user)
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('AUTH_SUCCESS', { token, user })
            resolve(resp)
          })
          .catch(err => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
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
        localStorage.removeItem('token')
        localStorage.removeItem('user')
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
    fetchNewWeatherData({ commit }, city) {
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