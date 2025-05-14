<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" />
      </div>
      <button class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({ username: '', password: '' }),
  methods: {
    login() {
      this.$store.dispatch('login', { username: this.username, password: this.password })
        .then(() => this.$router.push('/dashboard'));
    }
  }
};
</script>