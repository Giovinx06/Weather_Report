<template>
  <div class="register-view container mt-5">
    <h2>Registrazione</h2>
    <form @submit.prevent="handleRegister" class="mt-4">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="form.username" type="text" class="form-control" id="username" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="form.email" type="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="form.password" type="password" class="form-control" id="password" required minlength="6" />
      </div>
      <button type="submit" class="btn btn-primary">Registrati</button>
    </form>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-if="success" class="alert alert-success mt-3">Registrazione avvenuta con successo! Ora puoi <router-link to="/login">accedere</router-link>.</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "RegisterView",
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      error: '',
      success: false
    }
  },
  methods: {
    async handleRegister() {
      this.error = ''
      this.success = false
      try {
        await axios.post('http://localhost:3000/api/auth/register', this.form)
        this.success = true
        this.form.username = ''
        this.form.email = ''
        this.form.password = ''
        this.$emit('toast', 'Registrazione avvenuta con successo! Ora puoi accedere.', 'success')
      } catch (err) {
        this.error = err.response?.data?.message || 'Errore durante la registrazione.'
        this.$emit('toast', this.error, 'danger')
      }
    }
  }
}
</script> 