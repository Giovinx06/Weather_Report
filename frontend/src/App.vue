<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Weather Insights</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item" v-if="!isAuthenticated">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
              <li class="nav-item" v-if="!isAuthenticated">
                <router-link class="nav-link" to="/register">Register</router-link>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item" v-if="isAuthenticated && isAdmin">
                <router-link class="nav-link" to="/users">Users</router-link>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <span class="nav-link text-primary">{{ username }}</span>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapState(['isAdmin', 'username']),
      ...mapGetters(['isAuthenticated']),
    },
    methods: {
      ...mapActions(['logout']),
      async handleLogout() {
        await this.logout();
        this.$router.push('/login');
      }
    }
  }
  </script>