<template>
    <div class="container mt-4">
      <h2>User Management</h2>
      <ul>
        <li v-for="u in users" :key="u.id">
          {{ u.username }}
          <button class="btn btn-sm btn-danger" @click="deleteUser(u.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data: () => ({ users: [] }),
    mounted() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axios.get('/api/users/', { headers: { Authorization: 'Bearer ' + this.$store.state.token } })
          .then(res => this.users = res.data.map((u, idx) => ({ id: idx+1, username: u })));
      },
      deleteUser(id) {
        axios.delete(`/api/users/${id}`, { headers: { Authorization: 'Bearer ' + this.$store.state.token } })
          .then(() => this.fetchUsers());
      }
    }
  }
  </script>