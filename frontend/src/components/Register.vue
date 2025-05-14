<template>
    <div class="container mt-5">
      <h2>Register</h2>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input v-model="username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <input type="password" v-model="confirmPassword" class="form-control" required />
        </div>
        <button class="btn btn-success" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Registrazione in corso...' : 'Registrati' }}
        </button>
      </form>
      <div class="mt-3">
        <p>Hai già un account? <router-link to="/login">Accedi</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
        successMessage: '',
        isLoading: false
      }
    },
    methods: {
      async handleRegister() {
        // Validazione
        if (!this.username || !this.password) {
          this.errorMessage = 'Inserisci username e password';
          return;
        }

        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Le password non corrispondono';
          return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        
        try {
          await axios.post('/auth/register', { 
            username: this.username, 
            password: this.password 
          });
          
          this.successMessage = 'Registrazione completata con successo! Verrai reindirizzato alla pagina di login...';
          this.username = '';
          this.password = '';
          this.confirmPassword = '';
          
          // Reindirizza dopo 2 secondi
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.msg) {
            this.errorMessage = error.response.data.msg;
          } else {
            this.errorMessage = 'Errore durante la registrazione. Riprova più tardi.';
          }
          console.error('Registration error:', error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
  </script>