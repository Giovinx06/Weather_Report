// frontend/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

// Configura axios
axios.defaults.baseURL = 'http://localhost:5000'

// Imposta il token se è già presente (per le sessioni attive)
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Interceptor per errori di autenticazione
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Logout automatico se riceviamo 401 Unauthorized
      store.dispatch('logout')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)

// Aggiungi componenti
app.use(router)
app.use(store)

// Monta l'app
app.mount('#app')

// Recupera info utente se necessario
if (token) {
  store.dispatch('fetchUserInfo')
}
