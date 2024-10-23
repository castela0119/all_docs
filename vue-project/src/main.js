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

app.use(createPinia())
app.use(router)
app.use(pinia) // Vue 앱에 Pinia 사용
app.mount('#app')

// 앱이 시작될 때 토큰을 복원
const authStore = useAuthStore()
authStore.loadTokenFromStorage()

app.use(Quasar, {
  plugins: {
    SessionStorage,
    Notify
  }
})
