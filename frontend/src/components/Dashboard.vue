<template>
    <div class="container mt-4">
      <h2>Dashboard</h2>
      <div class="mb-4">
        <h4>Daily Stats</h4>
        <div v-if="dailyStats.length === 0" class="alert alert-info">
          No stats available yet. Please refresh weather data.
        </div>
        <ul v-else>
          <li v-for="stat in dailyStats" :key="stat.day + stat.city">
            {{ formatDate(stat.day) }} - {{ stat.city }}: min {{ stat.min_temp }}°C, max {{ stat.max_temp }}°C, avg {{ stat.avg_temp }}°C
          </li>
        </ul>
      </div>
      <div>
        <h4>Trend for {{ selectedCity || 'City' }}</h4>
        <div v-if="cities.length === 0" class="alert alert-info">
          No cities available yet. Please refresh weather data.
        </div>
        <select v-else v-model="selectedCity" @change="fetchTrend" class="form-select mb-3">
          <option value="">Select a city</option>
          <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
        </select>
        <div v-if="trend.length === 0 && selectedCity" class="alert alert-info">
          No trend data available for {{ selectedCity }}.
        </div>
        <ul v-else-if="trend.length > 0">
          <li v-for="point in trend" :key="point.timestamp">
            {{ formatDateTime(point.timestamp) }}: {{ point.temperature }}°C
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data: () => ({ 
      dailyStats: [], 
      cities: [], 
      selectedCity: '', 
      trend: [] 
    }),
    mounted() {
      this.fetchDaily();
    },
    methods: {
      fetchDaily() {
        axios.get('/api/weather/stats')
          .then(res => {
            this.dailyStats = res.data;
            this.cities = [...new Set(this.dailyStats.map(s => s.city))];
            if (this.cities.length) {
              this.selectedCity = this.cities[0];
              this.fetchTrend();
            }
          })
          .catch(err => {
            console.error('Error fetching stats:', err);
          });
      },
      fetchTrend() {
        if (!this.selectedCity) return;
        
        axios.get(`/api/weather/trend/${this.selectedCity}`)
          .then(res => this.trend = res.data)
          .catch(err => {
            console.error('Error fetching trend:', err);
            this.trend = [];
          });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      },
      formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString();
      }
    }
  }
  </script>