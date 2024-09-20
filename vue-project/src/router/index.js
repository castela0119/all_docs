import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PaperType from '@/views/PaperType.vue' // PaperType 페이지
import BorrowDocument from '@/views/BorrowDocument.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/paper-type',
    name: 'PaperType',
    component: PaperType
  },
  {
    path: '/borrow-document',
    name: 'BorrowDocument',
    component: BorrowDocument
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
