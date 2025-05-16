<template>
  <div class="login">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Login</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="alert alert-danger" v-if="error">
                {{ error }}
              </div>
              
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input 
                  type="text" 
                  id="username"
                  class="form-control" 
                  v-model="username" 
                  required
                  placeholder="Inserisci il tuo username"
                >
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  id="password"
                  class="form-control" 
                  v-model="password" 
                  required
                  placeholder="Inserisci la tua password"
                >
              </div>
              
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  {{ loading ? 'Accesso in corso...' : 'Accedi' }}
                </button>
              </div>
            </form>
            
            <div class="mt-3 text-center">
              <p>Non hai un account? <router-link to="/register">Registrati qui</router-link></p>
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
      loading: false
    }
  },
  methods: {
    login() {
      this.error = null
      this.loading = true
      
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
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
  }
}
</script> 