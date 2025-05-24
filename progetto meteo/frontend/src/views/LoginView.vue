<template>
  <div class="login-container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-md-10 col-lg-8 mx-auto">
        <div class="card login-card shadow-lg">
          <div class="row g-0">
            <div class="col-md-4 d-none d-md-block bg-primary login-image">
              <div class="login-overlay d-flex flex-column justify-content-center align-items-center text-white p-4">
                <h3 class="fw-bold mb-3">Meteo App</h3>
                <p class="text-center">Accedi al tuo account per visualizzare i dati meteo in tempo reale</p>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body p-4 p-md-5">
                <div class="text-center mb-4">
                  <i class="fas fa-cloud-sun fa-3x text-primary mb-3"></i>
                  <h2 class="fw-bold text-primary mb-1">Accedi all'App Meteo</h2>
                  <p class="text-muted">Controlla le previsioni del tempo in tempo reale</p>
                </div>
                
                <div class="alert alert-danger animate__animated animate__fadeIn" v-if="error">
                  <i class="fas fa-exclamation-circle me-2"></i>{{ error }}
                </div>
                
                <form @submit.prevent="login" class="needs-validation">
                  <div class="form-floating mb-4">
                    <input 
                      type="text" 
                      id="username"
                      class="form-control form-control-lg" 
                      v-model="username" 
                      required
                      placeholder="Username"
                    >
                    <label for="username"><i class="fas fa-user me-2"></i>Username</label>
                  </div>
                  
                  <div class="form-floating mb-4">
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      id="password"
                      class="form-control form-control-lg" 
                      v-model="password" 
                      required
                      placeholder="Password"
                    >
                    <label for="password"><i class="fas fa-lock me-2"></i>Password</label>
                    <span 
                      class="password-toggle" 
                      @click="showPassword = !showPassword"
                    >
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </span>
                  </div>
                  
                  <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe">
                    <label class="form-check-label" for="rememberMe">
                      Ricordami
                    </label>
                    <a href="#" class="float-end text-decoration-none">Password dimenticata?</a>
                  </div>
                  
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
                      <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ loading ? 'Accesso in corso...' : 'Accedi' }}
                    </button>
                  </div>
                </form>
                
                <div class="mt-4 text-center">
                  <p>Non hai un account? <router-link to="/register" class="text-primary fw-bold">Registrati ora</router-link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: null,
      loading: false,
      showPassword: false,
      rememberMe: localStorage.getItem('rememberCredentials') === 'true'
    }
  },
  methods: {
    login() {
      this.error = null
      this.loading = true
      
      // Salva le credenziali se rememberMe è selezionato
      if (this.rememberMe) {
        localStorage.setItem('savedUsername', this.username)
        localStorage.setItem('rememberCredentials', 'true')
      } else {
        localStorage.removeItem('savedUsername')
        localStorage.removeItem('rememberCredentials')
      }
      
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .then(() => {
        // Redirect to dashboard or the page they were trying to visit
        const redirectPath = this.$route.query.redirect || '/dashboard'
        this.$router.push(redirectPath)
      })
      .catch(err => {
        this.error = err.response?.data?.message || 'Si è verificato un errore durante il login'
      })
      .finally(() => {
        this.loading = false
      })
    }
  },
  created() {
    // If already logged in, redirect to dashboard
    if (this.$store.getters.isLoggedIn) {
      this.$router.push('/dashboard')
    }
    
    // Carica username salvato se l'opzione "Ricordami" era selezionata
    if (localStorage.getItem('rememberCredentials') === 'true') {
      this.username = localStorage.getItem('savedUsername') || ''
      this.rememberMe = true
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  margin-top: -5vh; /* Sposta il contenitore più in alto */
}

.login-card {
  border: none;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
}

.login-image {
  background: linear-gradient(135deg, #4a6cf7 0%, #0147b1 100%);
  position: relative;
}

.login-overlay {
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
  z-index: 10;
}

.form-floating label {
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

.form-control-lg {
  height: calc(3.5rem + 2px);
  padding: 1rem 0.75rem;
  font-size: 1.1rem;
}

.form-floating > .form-control-lg {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}

.form-floating > .form-control-lg ~ label {
  padding-top: 1rem;
  font-size: 0.95rem;
}

.btn-primary {
  background: linear-gradient(135deg, #4a6cf7 0%, #0147b1 100%);
  border: none;
  transition: all 0.3s ease;
  padding: 0.8rem;
  font-size: 1.1rem;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #395cd9 0%, #023a91 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.animate__animated {
  animation-duration: 0.5s;
}

.animate__fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Adattamento per dispositivi mobili */
@media (max-width: 767.98px) {
  .login-card {
    margin: 0 1rem;
  }
  
  .card-body {
    padding: 2rem 1.5rem;
  }
}
</style> 