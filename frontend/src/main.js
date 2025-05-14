// frontend/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)

// 1. Configure Axios so calls go to your Flask container:
const api = axios.create({
  baseURL: 'http://localhost:5000'  // <-- match your docker-compose port mapping
})

// 2. Expose it as global property so in components you can do `this.$api.get(...)`:
app.config.globalProperties.$api = api

// 3. Mount your app:
app.mount('#app')
