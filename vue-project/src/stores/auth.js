import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('userToken') || null // 처음에 localStorage에서 토큰을 가져옴
  }),
  actions: {
    setToken(token, nickname) {
      this.token = token
      this.nickname = nickname
      localStorage.setItem('userToken', token) // 토큰을 localStorage에 저장
      localStorage.setItem('nickname', nickname) // 닉네임도 localStorage에 저장
    },
    clearToken() {
      this.token = null
      this.nickname = null
      localStorage.removeItem('userToken') // 토큰을 localStorage에서 제거
      localStorage.removeItem('nickname') // 닉네임도 제거
    },
    // localStorage에서 토큰을 다시 로드하는 함수
    loadFromStorage() {
      const token = localStorage.getItem('userToken')
      const nickname = localStorage.getItem('nickname')
      if (token && nickname) {
        this.token = token
        this.nickname = nickname
      }
    },
    isLoggedIn() {
      return !!this.token
    }
  }
})
