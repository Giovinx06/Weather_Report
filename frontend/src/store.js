import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: { 
    token: localStorage.getItem('token') || '',
    isAdmin: localStorage.getItem('isAdmin') === 'true' || false,
    username: localStorage.getItem('username') || '',
    authStatus: ''
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.authStatus
  },
  mutations: {
    auth_request(state) {
      state.authStatus = 'loading';
    },
    auth_success(state, token) {
      state.authStatus = 'success';
      state.token = token;
      localStorage.setItem('token', token);
    },
    auth_error(state) {
      state.authStatus = 'error';
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
      state.authStatus = '';
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('username');
    }
  },
  actions: {
    login({ commit }, creds) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post('/auth/login', creds)
          .then(res => {
            const token = res.data.access_token;
            const userInfo = {
              isAdmin: res.data.is_admin,
              username: res.data.username
            };
            
            commit('auth_success', token);
            commit('setUserInfo', userInfo);
            
            // Imposta token per richieste future
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            resolve(res);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('clearUserInfo');
        
        // Rimuovi header Authorization
        delete axios.defaults.headers.common['Authorization'];
        
        resolve();
      });
    },
    fetchUserInfo({ commit, state }) {
      // Se il token esiste e le info utente sono mancanti, recuperale
      if (state.token && (!state.username || state.isAdmin === undefined)) {
        return axios.get('/auth/me')
          .then(res => {
            commit('setUserInfo', {
              isAdmin: res.data.is_admin, 
              username: res.data.username
            });
          })
          .catch(() => {
            // Se fallisce, logout
            commit('clearUserInfo');
          });
      }
    }
  }
});