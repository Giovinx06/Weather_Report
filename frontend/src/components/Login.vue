<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button class="btn btn-primary" type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <div class="mt-3">
      <p>Non hai un account? <router-link to="/register">Registrati</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Inserisci username e password';
        return;
      }
      
      this.isLoading = true;
      this.errorMessage = '';
      
      try {
        await this.login({ username: this.username, password: this.password });
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          this.errorMessage = error.response.data.msg;
        } else {
          this.errorMessage = 'Errore di autenticazione. Controlla le tue credenziali.';
        }
        console.error('Login error:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>