<template>
  <div class="weather-view">
    <div class="container py-4">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="display-5 fw-bold text-primary mb-1">
          <i class="fas fa-cloud-sun me-2"></i> Meteo
        </h1>
        <p class="lead text-muted">Consulta le previsioni meteo in tempo reale per qualsiasi città</p>
      </div>
      
      <!-- Search Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <form class="row g-3" @submit.prevent="fetchWeather">
            <div class="col-md-8 col-lg-6">
              <div class="input-group input-group-lg">
                <span class="input-group-text bg-white border-end-0">
                  <i class="fas fa-search text-primary"></i>
                </span>
                <input 
                  v-model="city" 
                  type="text" 
                  class="form-control border-start-0 ps-0" 
                  placeholder="Inserisci una città..." 
                  required 
                />
              </div>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary btn-lg px-4" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ loading ? 'Cercando...' : 'Cerca' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Alerts -->
      <div v-if="error" class="alert alert-danger border-0 shadow-sm d-flex align-items-center" role="alert">
        <i class="fas fa-exclamation-circle me-3 fs-4"></i>
        <div>{{ error }}</div>
      </div>
      
      <div v-if="loading && !error" class="alert alert-info border-0 shadow-sm d-flex align-items-center" role="alert">
        <i class="fas fa-spinner fa-spin me-3 fs-4"></i>
        <div>Caricamento delle informazioni meteo...</div>
      </div>
      
      <div v-if="weatherData.length === 0 && !loading && !error" class="alert alert-secondary border-0 shadow-sm d-flex align-items-center" role="alert">
        <i class="fas fa-info-circle me-3 fs-4"></i>
        <div>Nessun dato meteo disponibile. Cerca una città per visualizzare i dati.</div>
      </div>
      
      <!-- Weather Results -->
      <div v-if="weatherData.length > 0" class="card border-0 shadow-sm">
        <div class="card-header bg-white d-flex align-items-center py-3">
          <i class="fas fa-history text-primary me-2 fs-4"></i>
          <h5 class="mb-0">Ricerche meteo recenti</h5>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 weather-table">
              <thead>
                <tr>
                  <th>Città</th>
                  <th>Temperatura</th>
                  <th>Condizione</th>
                  <th>Data ricerca</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in weatherData" :key="idx" :class="rowClass(item)">
                  <td class="ps-3">
                    <i class="fas fa-map-marker-alt me-2 text-primary"></i>
                    <span class="fw-medium">{{ item.city }}</span>, 
                    <span class="text-muted small">{{ item.country }}</span>
                  </td>
                  <td>
                    <span class="fs-5 fw-bold">{{ item.temperature }}°C</span>
                    <span class="ms-2 text-muted small" v-if="item.humidity">
                      <i class="fas fa-tint me-1"></i>{{ item.humidity }}%
                    </span>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="me-2">
                        <i :class="weatherIconClass(item)" style="font-size: 24px; width: 40px; text-align: center;"></i>
                      </div>
                      <span>{{ item.description }}</span>
                    </div>
                  </td>
                  <td>{{ formatDate(item.fetchDate || item.createdAt || item.date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "WeatherView",
  data() {
    return {
      city: '',
      loading: false,
      error: ''
    }
  },
  computed: {
    ...mapGetters(['weatherData'])
  },
  methods: {
    async fetchWeather() {
      this.error = ''
      this.loading = true
      try {
        await this.$store.dispatch('fetchNewWeatherData', this.city)
        await this.$store.dispatch('fetchWeatherData')
      } catch (err) {
        this.error = err.response?.data?.message || 'Errore durante il recupero dei dati meteo.'
      } finally {
        this.loading = false
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleString();
    },
    rowClass(item) {
      if (!item || !item.description) return '';
      const desc = item.description.toLowerCase();
      
      if (desc.includes('pioggia') || desc.includes('rain')) return 'weather-rain';
      if (desc.includes('sereno') || desc.includes('clear') || desc.includes('sun')) return 'weather-clear';
      if (desc.includes('nuvol') || desc.includes('cloud')) return 'weather-cloud';
      if (desc.includes('neve') || desc.includes('snow')) return 'weather-snow';
      if (desc.includes('temporale') || desc.includes('storm') || desc.includes('thunder')) return 'weather-storm';
      if (desc.includes('nebbia') || desc.includes('fog')) return 'weather-fog';
      
      return '';
    },
    weatherIconClass(item) {
      if (!item || !item.description) return 'fas fa-cloud fa-lg text-secondary';
      const desc = item.description.toLowerCase();
      
      if (desc.includes('pioggia') || desc.includes('rain')) return 'fas fa-cloud-rain fa-lg text-info';
      if (desc.includes('sereno') || desc.includes('clear') || desc.includes('sun')) return 'fas fa-sun fa-lg text-warning';
      if (desc.includes('nuvol') || desc.includes('cloud')) return 'fas fa-cloud fa-lg text-secondary';
      if (desc.includes('neve') || desc.includes('snow')) return 'fas fa-snowflake fa-lg text-info';
      if (desc.includes('temporale') || desc.includes('storm') || desc.includes('thunder')) return 'fas fa-bolt fa-lg text-warning';
      if (desc.includes('nebbia') || desc.includes('fog')) return 'fas fa-smog fa-lg text-secondary';
      if (desc.includes('vento') || desc.includes('wind')) return 'fas fa-wind fa-lg text-info';
      
      return 'fas fa-cloud fa-lg text-secondary';
    },
    getWeatherIconUrl(icon) {
      // Se l'icona è già un URL completo, usala
      if (icon && icon.startsWith('http')) {
        return icon;
      }
      // Se l'icona è un codice OpenWeatherMap (es. "01d.png" o "01d")
      else if (icon) {
        // Se l'icona contiene già .png, usa il formato corretto
        if (icon.includes('.png')) {
          return `https://openweathermap.org/img/wn/${icon.replace('.png', '')}@2x.png`;
        }
        // Altrimenti aggiungi @2x.png
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
      }
      // Fallback su un'icona generica se manca l'icona
      return null;
    }
  },
  mounted() {
    if (this.weatherData.length === 0) {
      this.$store.dispatch('fetchWeatherData').catch(() => {})
    }
  }
}
</script>

<style scoped>
.weather-view {
  min-height: 70vh;
}

.card {
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-group-text {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.form-control {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.weather-icon {
  width: 40px;
  height: 40px;
}

.weather-table th {
  font-weight: 600;
  border-top: none;
  border-bottom-width: 1px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.weather-table td {
  padding: 1rem 1.5rem;
}

/* Classi per le righe della tabella in base alle condizioni meteo */
.weather-rain {
  background-color: rgba(227, 242, 253, 0.4);
}

.weather-clear {
  background-color: rgba(255, 248, 225, 0.4);
}

.weather-cloud {
  background-color: rgba(236, 239, 241, 0.4);
}

.weather-snow {
  background-color: rgba(237, 247, 251, 0.4);
}

.weather-storm {
  background-color: rgba(232, 234, 246, 0.4);
}

.weather-fog {
  background-color: rgba(224, 224, 224, 0.4);
}

/* Responsive tweaks */
@media (max-width: 767.98px) {
  .display-5 {
    font-size: 1.75rem;
  }
  
  .lead {
    font-size: 1rem;
  }
}
</style> 