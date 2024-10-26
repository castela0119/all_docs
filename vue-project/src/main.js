import './assets/main.css'

import { createApp } from 'vue'
import { Quasar, SessionStorage, Notify } from 'quasar'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import App from './App.vue'
import router from './router'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

const app = createApp(App)
const pinia = createPinia() // Pinia 인스턴스 생성

// Vue 앱에 Pinia와 Quasar 사용
app.use(pinia)
app.use(Quasar, {
  plugins: {
    SessionStorage,
    Notify
  }
})
app.use(router)
app.mount('#app')

// Pinia가 초기화된 후에 authStore 사용
const authStore = useAuthStore()
authStore.loadTokenFromStorage()
