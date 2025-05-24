<template>
  <div :id="'app'" :class="theme">
    <!-- Include Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">Progetto Meteo</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/weather">Meteo</router-link>
            </li>
          </ul>
          <ul class="navbar-nav align-items-center">
            <li class="nav-item me-2">
              <button class="btn btn-outline-light btn-sm" @click="toggleTheme">
                <span v-if="theme === 'light'">🌙</span>
                <span v-else>☀️</span>
              </button>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/register">Registrati</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn && isAdmin">
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link class="nav-link" to="/profile">Profilo</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <transition name="fade" mode="out-in">
        <router-view @toast="showToast" />
      </transition>
    </div>

    <div aria-live="polite" aria-atomic="true" class="position-fixed bottom-0 end-0 p-3" style="z-index: 9999">
      <div v-if="toast.show" :class="`toast align-items-center text-white bg-${toast.type} border-0 show`" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="toast.show = false"></button>
        </div>
      </div>
    </div>

    <footer class="mt-5 py-3 bg-light text-center">
      <div class="container">
        <p>© 2025 Progetto Meteo</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      toast: {
        show: false,
        message: '',
        type: 'success'
      },
      theme: localStorage.getItem('theme') || 'light'
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  },
  watch: {
    theme(newTheme) {
      document.body.className = newTheme;
      localStorage.setItem('theme', newTheme);
    }
  },
  mounted() {
    document.body.className = this.theme;
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.showToast('Logout effettuato con successo', 'success');
          this.$router.push('/login');
        });
    },
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => { this.toast.show = false }, 3000);
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

footer {
  margin-top: auto;
}

.toast.bg-success { background-color: #198754 !important; }
.toast.bg-danger { background-color: #dc3545 !important; }
.toast.bg-info { background-color: #0dcaf0 !important; }
.toast.bg-warning { background-color: #ffc107 !important; color: #212529 !important; }

/* Tema scuro */
body.dark, #app.dark {
  background: #181a1b !important;
  color: #f1f1f1 !important;
}
body.dark .navbar, #app.dark .navbar {
  background: #23272b !important;
}
body.dark .card, #app.dark .card {
  background: #23272b !important;
  color: #f1f1f1 !important;
}
body.dark .table, #app.dark .table {
  background: #23272b !important;
  color: #f1f1f1 !important;
}
body.dark .form-control, #app.dark .form-control {
  background: #23272b !important;
  color: #f1f1f1 !important;
  border-color: #444 !important;
}
body.dark .btn-primary, #app.dark .btn-primary {
  background: #0d6efd !important;
  border-color: #0d6efd !important;
}
body.dark .bg-light, #app.dark .bg-light {
  background: #23272b !important;
  color: #f1f1f1 !important;
}
body.dark .alert-secondary, #app.dark .alert-secondary {
  background: #23272b !important;
  color: #f1f1f1 !important;
  border-color: #444 !important;
}
body.dark .alert-info, #app.dark .alert-info {
  background: #0dcaf0 !important;
  color: #181a1b !important;
}
body.dark .alert-danger, #app.dark .alert-danger {
  background: #dc3545 !important;
  color: #fff !important;
}
body.dark .alert-success, #app.dark .alert-success {
  background: #198754 !important;
  color: #fff !important;
}

/* Transizioni fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 