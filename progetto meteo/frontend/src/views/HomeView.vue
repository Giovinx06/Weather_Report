<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="display-4 fw-bold text-gradient mb-3">
              Esplora il meteo in tempo reale
            </h1>
            <p class="lead mb-4">
              Un'applicazione moderna per accedere e analizzare dati meteo da tutto il mondo, 
              con un'interfaccia intuitiva e strumenti di visualizzazione avanzati.
            </p>
            <div class="d-grid gap-2 d-sm-flex">
              <router-link to="/dashboard" class="btn btn-primary btn-lg px-4 me-sm-3" v-if="isLoggedIn">
                <i class="fas fa-tachometer-alt me-2"></i>Dashboard
              </router-link>
              <router-link to="/login" class="btn btn-primary btn-lg px-4 me-sm-3" v-if="!isLoggedIn">
                <i class="fas fa-sign-in-alt me-2"></i>Accedi
              </router-link>
              <router-link to="/register" class="btn btn-outline-primary btn-lg px-4" v-if="!isLoggedIn">
                <i class="fas fa-user-plus me-2"></i>Registrati
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image-container text-center">
              <div class="weather-animation">
                <i class="fas fa-cloud-sun weather-icon sun-icon"></i>
                <i class="fas fa-cloud weather-icon cloud-icon-1"></i>
                <i class="fas fa-cloud weather-icon cloud-icon-2"></i>
                <i class="fas fa-cloud-rain weather-icon rain-icon"></i>
              </div>
              <div class="dashboard-preview shadow-lg rounded-3">
                <div class="dashboard-header">
                  <div class="dashboard-title">
                    <i class="fas fa-tachometer-alt me-2"></i>
                    Meteo App
                  </div>
                  <div class="dashboard-nav">
                    <span class="nav-item active"><i class="fas fa-home"></i></span>
                    <span class="nav-item"><i class="fas fa-chart-line"></i></span>
                    <span class="nav-item"><i class="fas fa-cog"></i></span>
                  </div>
                </div>
                <div class="dashboard-body">
                  <div class="weather-card current-weather">
                    <div class="weather-card-header">
                      <div>Ora</div>
                      <div class="location"><i class="fas fa-map-marker-alt"></i> Roma</div>
                    </div>
                    <div class="weather-card-content">
                      <div class="temperature">24°</div>
                      <div class="weather-icon-container">
                        <i class="fas fa-sun"></i>
                      </div>
                      <div class="weather-condition">Soleggiato</div>
                      <div class="weather-details">
                        <div class="detail"><i class="fas fa-wind"></i> 5 km/h</div>
                        <div class="detail"><i class="fas fa-tint"></i> 30%</div>
                      </div>
                    </div>
                  </div>
                  <div class="forecast-container">
                    <div class="forecast-item">
                      <div class="forecast-day">Lun</div>
                      <div class="forecast-icon"><i class="fas fa-sun"></i></div>
                      <div class="forecast-temp">26°</div>
                    </div>
                    <div class="forecast-item">
                      <div class="forecast-day">Mar</div>
                      <div class="forecast-icon"><i class="fas fa-cloud-sun"></i></div>
                      <div class="forecast-temp">24°</div>
                    </div>
                    <div class="forecast-item">
                      <div class="forecast-day">Mer</div>
                      <div class="forecast-icon"><i class="fas fa-cloud"></i></div>
                      <div class="forecast-temp">22°</div>
                    </div>
                    <div class="forecast-item">
                      <div class="forecast-day">Gio</div>
                      <div class="forecast-icon"><i class="fas fa-cloud-rain"></i></div>
                      <div class="forecast-temp">20°</div>
                    </div>
                  </div>
                  <div class="search-cities">
                    <div class="search-input">
                      <i class="fas fa-search"></i>
                      <span>Cerca una città...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">Caratteristiche principali</h2>
          <p class="lead text-muted">Scopri cosa puoi fare con la nostra app meteo</p>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm feature-card">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white mb-4">
                  <i class="fas fa-clock"></i>
                </div>
                <h5 class="card-title fw-bold">Dati in tempo reale</h5>
                <p class="card-text">Accedi a dati meteo aggiornati da OpenWeatherMap API con previsioni accurate e dettagliate.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm feature-card">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white mb-4">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h5 class="card-title fw-bold">API REST sicure</h5>
                <p class="card-text">Tutte le API sono protette da autenticazione JWT per garantire la sicurezza dei tuoi dati.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm feature-card">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white mb-4">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h5 class="card-title fw-bold">Dashboard interattiva</h5>
                <p class="card-text">Visualizza e analizza i dati meteo con grafici interattivi e interfacce intuitive.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tech & Features Section -->
    <div class="tech-section py-5 bg-light">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white d-flex align-items-center py-3">
                <i class="fas fa-laptop-code text-primary me-2 fs-4"></i>
                <h5 class="mb-0">Tecnologie utilizzate</h5>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush tech-list">
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fab fa-node-js text-success me-3"></i>
                    <span>Node.js e Express per il backend</span>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fas fa-database text-info me-3"></i>
                    <span>PostgreSQL per l'archiviazione dei dati</span>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fab fa-vuejs text-success me-3"></i>
                    <span>Vue.js per l'interfaccia utente</span>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fas fa-key text-warning me-3"></i>
                    <span>API REST autenticate con JWT</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white d-flex align-items-center py-3">
                <i class="fas fa-star text-primary me-2 fs-4"></i>
                <h5 class="mb-0">Funzionalità principali</h5>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush feature-list">
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fas fa-cloud-download-alt text-primary me-3"></i>
                    <span>Recupero dati da API esterne</span>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fas fa-save text-primary me-3"></i>
                    <span>Archiviazione dei dati in database locale</span>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fas fa-cogs text-primary me-3"></i>
                    <span>Elaborazione dati</span>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fas fa-plug text-primary me-3"></i>
                    <span>Esposizione API REST autenticate</span>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fas fa-tachometer-alt text-primary me-3"></i>
                    <span>Console di amministrazione</span>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="fas fa-chart-bar text-primary me-3"></i>
                    <span>Visualizzazione dati con grafici</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="cta-section py-5">
      <div class="container">
        <div class="cta-card text-center p-5 border-0 shadow-lg rounded-3">
          <h2 class="fw-bold mb-3">Pronto a iniziare?</h2>
          <p class="lead mb-4">Registrati oggi e accedi a tutte le funzionalità della nostra applicazione meteo</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <router-link to="/register" class="btn btn-primary btn-lg px-4 me-sm-3" v-if="!isLoggedIn">
              <i class="fas fa-user-plus me-2"></i>Crea un account
            </router-link>
            <router-link to="/dashboard" class="btn btn-primary btn-lg px-4 me-sm-3" v-if="isLoggedIn">
              <i class="fas fa-tachometer-alt me-2"></i>Vai alla Dashboard
            </router-link>
            <router-link to="/login" class="btn btn-outline-primary btn-lg px-4" v-if="!isLoggedIn">
              <i class="fas fa-sign-in-alt me-2"></i>Accedi
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>

<style scoped>
.home-view {
  overflow-x: hidden;
}

/* Hero section */
.hero-section {
  padding: 2rem 0;
  position: relative;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.text-gradient {
  background: linear-gradient(90deg, #4a6cf7, #0147b1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-image-container {
  position: relative;
  z-index: 1;
}

.dashboard-preview {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dashboard-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.dashboard-header {
  background: linear-gradient(135deg, #4a6cf7 0%, #0147b1 100%);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.dashboard-nav {
  display: flex;
  gap: 1rem;
}

.nav-item {
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.nav-item.active, .nav-item:hover {
  opacity: 1;
}

.dashboard-body {
  padding: 1rem;
  background-color: #f8f9fa;
}

.weather-card {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.weather-card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #6c757d;
}

.weather-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 0.5rem;
  color: #343a40;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.weather-icon-container {
  font-size: 2.5rem;
  color: #ffc107;
  margin-bottom: 0.5rem;
}

.weather-icon-container i {
  animation: rotate 8s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.weather-condition {
  font-weight: 500;
  margin-bottom: 1rem;
  color: #343a40;
}

.weather-details {
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 0.85rem;
  color: #6c757d;
}

.forecast-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.forecast-item {
  background-color: white;
  padding: 0.75rem 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  flex: 1;
  margin: 0 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: transform 0.2s ease;
  cursor: pointer;
}

.forecast-item:hover {
  transform: translateY(-3px);
}

.forecast-day {
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.forecast-icon {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.forecast-icon i {
  transition: all 0.3s ease;
}

.forecast-item:hover .forecast-icon i {
  transform: scale(1.2);
}

.forecast-temp {
  font-weight: bold;
  color: #343a40;
}

.search-cities {
  margin-top: 0.5rem;
}

.search-input {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  color: #6c757d;
}

.search-input i {
  margin-right: 0.5rem;
}

/* Weather animation */
.weather-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.weather-icon {
  position: absolute;
  font-size: 3rem;
  opacity: 0.5;
}

.sun-icon {
  color: #ffc107;
  top: 10%;
  right: 20%;
  animation: float 6s ease-in-out infinite;
}

.cloud-icon-1 {
  color: #6c757d;
  top: 30%;
  left: 10%;
  animation: float 8s ease-in-out infinite 1s;
}

.cloud-icon-2 {
  color: #adb5bd;
  bottom: 30%;
  right: 10%;
  animation: float 7s ease-in-out infinite 2s;
}

.rain-icon {
  color: #0dcaf0;
  bottom: 20%;
  left: 20%;
  animation: float 5s ease-in-out infinite 1.5s;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Features section */
.features-section {
  background-color: #fff;
}

.feature-card {
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  font-size: 1.5rem;
}

/* Tech section */
.tech-section {
  background-color: #f8f9fa;
}

.tech-list .list-group-item, 
.feature-list .list-group-item {
  background: transparent;
  border-left: none;
  border-right: none;
  transition: background-color 0.2s ease;
}

.tech-list .list-group-item:hover, 
.feature-list .list-group-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.tech-list i, 
.feature-list i {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
}

/* CTA section */
.cta-section {
  padding: 2rem 0;
}

.cta-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 1rem;
}

/* Responsive */
@media (max-width: 991.98px) {
  .hero-section {
    text-align: center;
  }
  
  .weather-animation {
    display: none;
  }
  
  .dashboard-preview {
    margin-top: 2rem;
  }
}

@media (max-width: 767.98px) {
  .hero-image {
    max-width: 70%;
  }
  
  .feature-icon {
    width: 56px;
    height: 56px;
    font-size: 1.25rem;
  }
  
  .temperature {
    font-size: 2.5rem;
  }
  
  .forecast-container {
    flex-wrap: wrap;
  }
  
  .forecast-item {
    flex: 0 0 calc(50% - 0.5rem);
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 575.98px) {
  .dashboard-preview {
    width: 100%;
  }
  
  .forecast-item {
    flex: 0 0 calc(50% - 0.5rem);
  }
}
</style>