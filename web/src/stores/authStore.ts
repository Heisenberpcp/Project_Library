import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService, type User } from '../services/authService'

export const useAuthStore = defineStore('authStore', () => {
  const currentUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function runAuthRequest(action: () => Promise<User>) {
    isLoading.value = true
    error.value = null
    try {
      currentUser.value = await action()
      return currentUser.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Authentication failed.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function login(email: string, password: string) {
    return runAuthRequest(() => authService.login(email, password))
  }

  function register(username: string, email: string, password: string) {
    return runAuthRequest(() => authService.register(username, email, password))
  }

  function logout() {
    currentUser.value = null
    error.value = null
  }

  return { currentUser, isLoading, error, login, register, logout }
})