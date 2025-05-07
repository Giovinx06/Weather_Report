import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: { token: localStorage.getItem('token') || '' },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    }
  },
  actions: {
    login({ commit }, creds) {
      return axios.post('/auth/login', creds)
        .then(res => commit('setToken', res.data.access_token));
    }
  }
});