import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: { 
    token: localStorage.getItem('token') || '',
    isAdmin: localStorage.getItem('isAdmin') === 'true' || false,
    username: localStorage.getItem('username') || '' 
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUserInfo(state, { isAdmin, username }) {
      state.isAdmin = isAdmin;
      state.username = username;
      localStorage.setItem('isAdmin', isAdmin);
      localStorage.setItem('username', username);
    },
    clearUserInfo(state) {
      state.token = '';
      state.isAdmin = false;
      state.username = '';
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('username');
    }
  },
  actions: {
    login({ commit }, creds) {
      return axios.post('/auth/login', creds)
        .then(res => {
          commit('setToken', res.data.access_token);
          commit('setUserInfo', { 
            isAdmin: res.data.is_admin, 
            username: res.data.username 
          });
        });
    },
    logout({ commit }) {
      commit('clearUserInfo');
    }
  }
});