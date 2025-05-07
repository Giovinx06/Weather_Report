<template>
    <div class="container mt-4">
      <h2>Dashboard</h2>
      <div class="mb-4">
        <h4>Daily Stats</h4>
        <ul>
          <li v-for="stat in dailyStats" :key="stat.day + stat.city">
            {{ stat.day }} - {{ stat.city }}: min {{ stat.min_temp }}°C, max {{ stat.max_temp }}°C, avg {{ stat.avg_temp }}°C
          </li>
        </ul>
      </div>
      <div>
        <h4>Trend for {{ selectedCity }}</h4>
        <select v-model="selectedCity" @change="fetchTrend">
          <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
        </select>
        <ul>
          <li v-for="point in trend" :key="point.timestamp">
            {{ point.timestamp }}: {{ point.temperature }}°C
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data: () => ({ dailyStats: [], cities: [], selectedCity: '', trend: [] }),
    mounted() {
      this.fetchDaily();
    },
    methods: {
      fetchDaily() {
        axios.get('/api/weather/stats', { headers: { Authorization: 'Bearer ' + this.$store.state.token } })
          .then(res => {
            this.dailyStats = res.data;
            this.cities = [...new Set(this.dailyStats.map(s => s.city))];
            if (this.cities.length) this.selectedCity = this.cities[0];
            this.fetchTrend();
          });
      },
      fetchTrend() {
        axios.get(`/api/weather/trend/${this.selectedCity}`, { headers: { Authorization: 'Bearer ' + this.$store.state.token } })
          .then(res => this.trend = res.data);
      }
    }
  }
  </script>