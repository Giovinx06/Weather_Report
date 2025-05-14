import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Dashboard from './components/Dashboard.vue';
import UserManagement from './components/UserManagement.vue';
import store from './store';

const routes = [
  { 
    path: '/', 
    redirect: '/dashboard' 
  },
  { 
    path: '/login', 
    component: Login,
    meta: { 
      guest: true 
    } 
  },
  { 
    path: '/register', 
    component: Register,
    meta: { 
      guest: true 
    } 
  },
  { 
    path: '/dashboard', 
    component: Dashboard, 
    meta: { 
      requiresAuth: true 
    } 
  },
  { 
    path: '/users', 
    component: UserManagement, 
    meta: { 
      requiresAuth: true,
      requiresAdmin: true 
    } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const isAdmin = store.state.isAdmin;
  
  // Redirect per pagine che richiedono autenticazione
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({ path: '/login' });
    }
    
    // Verifica requisiti di admin
    if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      return next({ path: '/dashboard' });
    }
  }
  
  // Se l'utente è già autenticato, reindirizza da login/register a dashboard
  if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
    return next({ path: '/dashboard' });
  }
  
  next();
});

export default router;