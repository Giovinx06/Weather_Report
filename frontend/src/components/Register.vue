<template>
    <div class="container mt-5">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input v-model="username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>
        <button class="btn btn-success">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data: () => ({ username: '', password: '' }),
    methods: {
      register() {
        axios.post('/auth/register', { username: this.username, password: this.password })
          .then(() => {
            this.$router.push('/login');
          })
          .catch(err => alert('Errore: ' + err.response.data.msg));
      }
    }
  }
  </script>