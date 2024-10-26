import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PaperType from '@/views/PaperType.vue' // PaperType 페이지
import BorrowDocument from '@/views/BorrowDocument.vue'
import BorrowDocumentCmpl from '@/views/BorrowDocumentCmpl.vue'
import OAuthRedirect from '@/views/OAuthRedirect.vue'

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
  },
  {
    path: '/borrow-document-cmpl',
    name: 'BorrowDocumentCmpl',
    component: BorrowDocumentCmpl
  },
  {
    path: '/oauth',
    name: 'oauthRedirect',
    component: OAuthRedirect // OAuth 리디렉션 처리 페이지
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router