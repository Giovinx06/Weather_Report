// frontend/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

// 1. Configure Axios so calls go to your Flask container:
axios.defaults.baseURL = 'http://localhost:5000'  // <-- match your docker-compose port mapping

// 2. Set up interceptors to add the auth token to requests
axios.interceptors.request.use(config => {
  const token = store.state.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add components
app.use(router)
app.use(store)

// Mount your app:
app.mount('#app')
