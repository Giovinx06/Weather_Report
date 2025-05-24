<template>
  <div class="profile-view">
    <div class="container py-4">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="display-5 fw-bold text-primary mb-1">
          <i class="fas fa-user-circle me-2"></i> Profilo Utente
        </h1>
        <p class="lead text-muted">Gestisci i tuoi dati personali e le impostazioni dell'account</p>
      </div>
      
      <div class="row">
        <!-- Colonna profilo -->
        <div class="col-md-4 mb-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white d-flex align-items-center py-3">
              <i class="fas fa-id-card text-primary me-2 fs-4"></i>
              <h5 class="mb-0">Informazioni personali</h5>
            </div>
            <div class="card-body">
              <div class="text-center mb-4">
                <div class="avatar-circle mb-3">
                  <span class="avatar-initials">{{ userInitials }}</span>
                </div>
                <h5 class="mb-0">{{ user.username }}</h5>
                <p class="text-muted">{{ user.email }}</p>
                <span class="badge" :class="user.role === 'admin' ? 'bg-danger' : 'bg-success'">
                  {{ user.role }}
                </span>
              </div>
              
              <hr>
              
              <div class="mt-3">
                <div class="mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-muted">Username</div>
                    <div class="fw-medium">{{ user.username }}</div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-muted">Email</div>
                    <div class="fw-medium">{{ user.email }}</div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-muted">Ruolo</div>
                    <div class="fw-medium">{{ user.role }}</div>
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-content-between">
                    <div class="text-muted">Stato</div>
                    <div>
                      <span class="badge bg-success">Attivo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Colonna cambio password -->
        <div class="col-md-8">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white d-flex align-items-center py-3">
              <i class="fas fa-key text-primary me-2 fs-4"></i>
              <h5 class="mb-0">Cambia password</h5>
            </div>
            <div class="card-body p-4">
              <p class="text-muted mb-4">
                Per cambiare la password, inserisci prima la tua password attuale e poi la nuova password.
                La nuova password deve essere di almeno 6 caratteri.
              </p>
              
              <div v-if="error" class="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4" role="alert">
                <i class="fas fa-exclamation-circle me-3 fs-4"></i>
                <div>{{ error }}</div>
              </div>
              
              <div v-if="success" class="alert alert-success border-0 shadow-sm d-flex align-items-center mb-4" role="alert">
                <i class="fas fa-check-circle me-3 fs-4"></i>
                <div>Password aggiornata con successo!</div>
              </div>
              
              <form @submit.prevent="changePassword">
                <div class="mb-4">
                  <label for="currentPassword" class="form-label">Password attuale</label>
                  <div class="input-group mb-2">
                    <span class="input-group-text bg-white">
                      <i class="fas fa-lock text-primary"></i>
                    </span>
                    <input 
                      v-model="form.currentPassword" 
                      :type="showCurrentPassword ? 'text' : 'password'" 
                      class="form-control" 
                      id="currentPassword" 
                      required 
                    />
                    <span class="input-group-text bg-white cursor-pointer" @click="showCurrentPassword = !showCurrentPassword">
                      <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </span>
                  </div>
                </div>
                
                <div class="mb-4">
                  <label for="newPassword" class="form-label">Nuova password</label>
                  <div class="input-group mb-2">
                    <span class="input-group-text bg-white">
                      <i class="fas fa-key text-primary"></i>
                    </span>
                    <input 
                      v-model="form.newPassword" 
                      :type="showNewPassword ? 'text' : 'password'" 
                      class="form-control" 
                      id="newPassword" 
                      required 
                      minlength="6" 
                    />
                    <span class="input-group-text bg-white cursor-pointer" @click="showNewPassword = !showNewPassword">
                      <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </span>
                  </div>
                  <div class="password-strength mt-2" v-if="form.newPassword">
                    <div class="d-flex justify-content-between mb-1">
                      <small>Forza password:</small>
                      <small>{{ passwordStrength }}</small>
                    </div>
                    <div class="progress" style="height: 5px;">
                      <div class="progress-bar" :class="passwordStrengthClass" role="progressbar" :style="`width: ${passwordStrengthPercentage}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-2"></i>Aggiorna password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: "ProfileView",
  data() {
    return {
      form: {
        currentPassword: '',
        newPassword: ''
      },
      error: '',
      success: false,
      showCurrentPassword: false,
      showNewPassword: false
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    user() {
      return this.currentUser || {};
    },
    userInitials() {
      if (!this.user.username) return '?';
      return this.user.username.charAt(0).toUpperCase();
    },
    passwordStrength() {
      if (!this.form.newPassword) return '';
      
      const length = this.form.newPassword.length;
      const hasUpperCase = /[A-Z]/.test(this.form.newPassword);
      const hasLowerCase = /[a-z]/.test(this.form.newPassword);
      const hasNumber = /\d/.test(this.form.newPassword);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.form.newPassword);
      
      let score = 0;
      if (length >= 8) score += 1;
      if (length >= 12) score += 1;
      if (hasUpperCase) score += 1;
      if (hasLowerCase) score += 1;
      if (hasNumber) score += 1;
      if (hasSpecialChar) score += 1;
      
      if (score < 2) return 'Debole';
      if (score < 4) return 'Media';
      if (score < 6) return 'Forte';
      return 'Molto forte';
    },
    passwordStrengthClass() {
      if (!this.form.newPassword) return '';
      
      const strength = this.passwordStrength;
      if (strength === 'Debole') return 'bg-danger';
      if (strength === 'Media') return 'bg-warning';
      if (strength === 'Forte') return 'bg-success';
      return 'bg-success';
    },
    passwordStrengthPercentage() {
      if (!this.form.newPassword) return 0;
      
      const strength = this.passwordStrength;
      if (strength === 'Debole') return 25;
      if (strength === 'Media') return 50;
      if (strength === 'Forte') return 75;
      return 100;
    }
  },
  methods: {
    async changePassword() {
      this.error = ''
      this.success = false
      try {
        await axios.put(`http://localhost:3000/api/users/${this.user.id}/change-password`, this.form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.success = true
        this.form.currentPassword = ''
        this.form.newPassword = ''
        this.$emit('toast', 'Password aggiornata con successo!', 'success')
      } catch (err) {
        this.error = err.response?.data?.message || 'Errore durante l\'aggiornamento della password.'
        this.$emit('toast', this.error, 'danger')
      }
    }
  }
}
</script>

<style scoped>
.profile-view {
  min-height: 70vh;
}

.card {
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-header {
  border-bottom: none;
  font-weight: 500;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  background-color: #4a6cf7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.avatar-initials {
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.cursor-pointer {
  cursor: pointer;
}

.input-group-text {
  width: 42px;
  justify-content: center;
}

/* Responsive tweaks */
@media (max-width: 767.98px) {
  .display-5 {
    font-size: 1.75rem;
  }
  
  .lead {
    font-size: 1rem;
  }
}
</style> 