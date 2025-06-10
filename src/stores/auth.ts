import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import AuthService from '@/api/auth'
import client from '@/http/client.ts'
import type { AuthToken, Roles } from '@/types/user'
import { requestWrapper } from '@/utils/requestWrapper'

const TOKEN_FIELD = 'auth_token'
const ROLE_FIELD = 'role'
const EMAIL_FIELD = 'email'

type CurrentUser = {
  email: string
  role: Roles
}

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(true)
  const authService = new AuthService()
  const currentUser = ref<CurrentUser | null>(null)

  function loadUserInfo() {
    const storedToken = localStorage.getItem(TOKEN_FIELD)
    const email = localStorage.getItem(EMAIL_FIELD)
    const role = localStorage.getItem(ROLE_FIELD)
    if (storedToken && email && role) {
      currentUser.value = {
        email: email,
        role: role as Roles,
      }
      client.addHeaders({
        Authorization: `Bearer ${storedToken}`,
      })
    }
    isLoading.value = false
  }

  function updateUserInfo(tokenData: AuthToken, email: string) {
    localStorage.setItem(TOKEN_FIELD, tokenData.access_token)
    localStorage.setItem(ROLE_FIELD, tokenData.role)
    localStorage.setItem(EMAIL_FIELD, email)
    currentUser.value = {
      email: email,
      role: tokenData.role as Roles,
    }
    client.addHeaders({
      Authorization: `Bearer ${tokenData.access_token}`,
    })
  }

  function deleteUserInfo() {
    localStorage.removeItem(TOKEN_FIELD)
    localStorage.removeItem(EMAIL_FIELD)
    localStorage.removeItem(ROLE_FIELD)

    client.removeHeaders(['Authorization'])
  }

  function login(email: string, password: string) {
    return requestWrapper(isLoading, () => authService.login(email, password)).then((data) => {
      updateUserInfo(data, email)
      return true
    })
  }

  function logout() {
    currentUser.value = null
    deleteUserInfo()
  }

  onMounted(() => {
    loadUserInfo()
  })

  return { isLoading, login, logout, currentUser }
})
