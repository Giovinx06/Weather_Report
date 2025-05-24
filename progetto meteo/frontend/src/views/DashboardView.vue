<template>
  <div class="dashboard-view">
    <div class="container py-4">
      <!-- Header con benvenuto -->
      <div class="dashboard-header mb-4">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="display-5 fw-bold text-primary mb-1">
              <i class="fas fa-tachometer-alt me-2"></i> Dashboard
            </h1>
            <p class="lead text-muted">Benvenuto, {{ user.username }}!</p>
          </div>
          <div class="col-md-6">
            <div class="alert alert-info border-0 shadow-sm d-flex align-items-center" role="alert">
              <i class="fas fa-info-circle me-3 fs-4"></i>
              <div>Qui puoi visualizzare i tuoi dati e le informazioni meteo in tempo reale.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sezione con statistiche -->
      <div class="row mb-4">
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center">
              <div class="display-4 text-primary mb-3">
                <i class="fas fa-user-circle"></i>
              </div>
              <h5 class="card-title">Profilo</h5>
              <p class="card-text">Gestisci i tuoi dati personali e le preferenze dell'account</p>
              <router-link to="/profile" class="btn btn-outline-primary">Vai al profilo</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center">
              <div class="display-4 text-primary mb-3">
                <i class="fas fa-cloud-sun"></i>
              </div>
              <h5 class="card-title">Meteo</h5>
              <p class="card-text">Consulta le previsioni meteo in tempo reale per qualsiasi città</p>
              <router-link to="/weather" class="btn btn-outline-primary">Vai al meteo</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center">
              <div class="display-4 text-primary mb-3">
                <i class="fas fa-history"></i>
              </div>
              <h5 class="card-title">Storico</h5>
              <p class="card-text">Visualizza lo storico delle tue ricerche meteo precedenti</p>
              <button class="btn btn-outline-primary">Visualizza storico</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Dati utente -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white d-flex align-items-center py-3">
          <i class="fas fa-user-circle text-primary me-2 fs-4"></i>
          <h5 class="mb-0">Dati utente</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 mb-3 mb-md-0">
              <div class="p-3 border rounded bg-light">
                <div class="small text-muted mb-1">Username</div>
                <div class="fw-bold">{{ user.username }}</div>
              </div>
            </div>
            <div class="col-md-4 mb-3 mb-md-0">
              <div class="p-3 border rounded bg-light">
                <div class="small text-muted mb-1">Email</div>
                <div class="fw-bold">{{ user.email }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 border rounded bg-light">
                <div class="small text-muted mb-1">Ruolo</div>
                <div class="fw-bold">
                  <span class="badge" :class="user.role === 'admin' ? 'bg-danger' : 'bg-success'">
                    {{ user.role }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dati Meteo -->
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white d-flex align-items-center py-3">
          <i class="fas fa-cloud-sun-rain text-primary me-2 fs-4"></i>
          <h5 class="mb-0">Dati Meteo Recenti</h5>
        </div>
        <div class="card-body">
          <div v-if="weatherData.length === 0" class="text-center py-4">
            <i class="fas fa-cloud-rain fa-3x text-muted mb-3"></i>
            <p class="mb-0">Nessun dato meteo disponibile.</p>
            <router-link to="/weather" class="btn btn-primary mt-3">
              <i class="fas fa-search me-2"></i>Cerca meteo
            </router-link>
          </div>
          <div v-else class="table-responsive">
            <table class="table table-hover align-middle weather-table">
              <thead>
                <tr>
                  <th>Città</th>
                  <th>Temperatura</th>
                  <th>Condizione</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in weatherData.slice(0, 5)" :key="idx" :class="rowClass(item)">
                  <td><i class="fas fa-map-marker-alt me-2 text-primary"></i>{{ item.city }}</td>
                  <td>
                    <span class="fw-bold">{{ item.temperature }}°C</span>
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
            <div v-if="weatherData.length > 5" class="text-center mt-3">
              <router-link to="/weather" class="btn btn-outline-primary">
                Visualizza tutti i dati
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "DashboardView",
  computed: {
    ...mapGetters(['currentUser', 'weatherData']),
    user() {
      return this.currentUser || {};
    }
  },
  methods: {
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
.dashboard-header {
  margin-bottom: 2rem;
}

.card {
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  border-bottom: none;
  font-weight: 500;
}

.weather-icon {
  width: 40px;
  height: 40px;
}

.weather-table th {
  font-weight: 600;
  border-top: none;
  border-bottom-width: 1px;
}

.weather-table td {
  padding: 0.75rem 1rem;
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
