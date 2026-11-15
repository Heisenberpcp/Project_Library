<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// Local component state for form inputs and UI status
const username = ref('')
const email = ref('')
const password = ref('')
const serverError = ref('')

// Local validation error messages
const errors = reactive({
  username: '',
  email: '',
  password: '',
})

const validateForm = (): boolean => {
  let isValid = true
  errors.username = ''
  errors.email = ''
  errors.password = ''
  serverError.value = ''

  if (!username.value.trim()) {
    errors.username = 'Username is required.'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    errors.email = 'Email is required.'
    isValid = false
  } else if (!emailRegex.test(email.value)) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  }

  // Password validation
  if (!password.value) {
    errors.password = 'Password is required.'
    isValid = false
  } else if (password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  serverError.value = ''
  try {
    await authStore.register(username.value, email.value, password.value)
    await router.push('/home')
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : 'Registration failed.'
  }
}
</script>

<template>
  <div class="SignUp-container">
    <form class="SignUp-card" @submit.prevent="handleRegister" novalidate>
      <h1 class="SignUp-title">Welcome</h1>
      <p class="SignUp-subtitle">Sign up for your account</p>

      <!-- Username Field -->
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          autocomplete="username"
          placeholder="Choose a username"
          class="form-input"
          :class="{ 'input-error': errors.username }"
        />
        <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
      </div>

      <!-- Global Error Banner -->
      <div v-if="serverError" class="error-banner">
        {{ serverError }}
      </div>

      <!-- Email Field -->
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="form-input"
          :class="{ 'input-error': errors.email }"
        />
        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
      </div>

      <!-- Password Field -->
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="More than 6 characters"
          class="form-input"
          :class="{ 'input-error': errors.password }"
        />
        <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
      </div>

      <!-- Submit Button with Loading State -->
      <button type="submit" class="submit-btn" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Signing up...' : 'Sign Up' }}
      </button>
      <RouterLink to="/">
        <button type="button" class="submit-btn" :disabled="authStore.isLoading">Sign In</button>
      </RouterLink>
    </form>
  </div>
</template>

<style scoped>
.SignUp-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;
}

.SignUp-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.SignUp-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.SignUp-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.error-banner {
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #991b1b;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.375rem;
}

.form-input {
  padding: 0.625rem 0.75rem;
  font-size: 0.95rem;
  color: #1f2937;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.error-text {
  font-size: 0.8rem;
  color: #dc2626;
  margin-top: 0.35rem;
}

.submit-btn {
  width: 100%;
  padding: 0.65rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #0db648;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 5px;
}
.submit-btn-register {
  width: 100%;
  padding: 0.65rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #0db648;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #740404;
}

.submit-btn:disabled {
  background-color: #dd0909;
  cursor: not-allowed;
}
</style>
