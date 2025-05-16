<template>
  <div class="home">
    <div class="jumbotron bg-light p-5 rounded">
      <h1 class="display-4">Benvenuto nel Progetto di Integrazione Dati</h1>
      <p class="lead">
        Questa applicazione consente di recuperare, memorizzare ed elaborare dati da API esterne.
      </p>
      <hr class="my-4">
      <p>
        Utilizza le API REST autenticate per accedere ai dati meteo da tutto il mondo.
      </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
        <router-link to="/dashboard" class="btn btn-primary btn-lg me-sm-3" v-if="isLoggedIn">
          Vai alla Dashboard
        </router-link>
        <router-link to="/login" class="btn btn-primary btn-lg me-sm-3" v-if="!isLoggedIn">
          Login
        </router-link>
        <router-link to="/register" class="btn btn-outline-secondary btn-lg" v-if="!isLoggedIn">
          Registrati
        </router-link>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Dati in tempo reale</h5>
            <p class="card-text">Accedi a dati meteo aggiornati da OpenWeatherMap API.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">API REST sicure</h5>
            <p class="card-text">Tutte le API sono protette da autenticazione JWT.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Dashboard interattiva</h5>
            <p class="card-text">Visualizza e analizza i dati con grafici interattivi.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <h3>Tecnologie utilizzate</h3>
        <ul class="list-group">
          <li class="list-group-item">Node.js e Express per il backend</li>
          <li class="list-group-item">PostgreSQL per l'archiviazione dei dati</li>
          <li class="list-group-item">Vue.js per l'interfaccia utente</li>
          <li class="list-group-item">Docker per la containerizzazione</li>
          <li class="list-group-item">API REST autenticate con JWT</li>
        </ul>
      </div>
      <div class="col-md-6">
        <h3>Funzionalità principali</h3>
        <ul class="list-group">
          <li class="list-group-item">Recupero dati da API esterne</li>
          <li class="list-group-item">Archiviazione dei dati in database locale</li>
          <li class="list-group-item">Elaborazione dati</li>
          <li class="list-group-item">Esposizione API REST autenticate</li>
          <li class="list-group-item">Console di amministrazione</li>
          <li class="list-group-item">Visualizzazione dati con grafici</li>
        </ul>
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