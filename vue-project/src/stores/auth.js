import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('userToken') || null, // 처음에 localStorage에서 토큰을 가져옴
    nickname: localStorage.getItem('nickname') || null // 닉네임 초기화
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
    loadFromStorage() {
      const token = localStorage.getItem('userToken')
      const nickname = localStorage.getItem('nickname')
      if (token && nickname) {
        this.token = token
        this.nickname = nickname
      }
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token // 로그인 상태를 boolean으로 반환
  }
})
