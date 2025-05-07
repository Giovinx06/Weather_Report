<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Weather Insights</a>
          <div class="collapse navbar-collapse">
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
              <li class="nav-item" v-if="isAuthenticated">
                <router-link class="nav-link" to="/users">Users</router-link>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState(['token']),
      isAuthenticated() {
        return !!this.token;
      }
    },
    methods: {
      ...mapMutations(['setToken']),
      logout() {
        this.setToken('');
        this.$router.push('/login');
      }
    }
  }
  </script>