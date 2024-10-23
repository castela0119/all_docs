import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PaperType from '@/views/PaperType.vue' // PaperType 페이지
import BorrowDocument from '@/views/BorrowDocument.vue'
import BorrowDocumentCmpl from '@/views/BorrowDocumentCmpl.vue'
import OAuthRedirect from '@/views/OAuthRedirect.vue'
import BorrowDocumentGuest from '@/views/guest/BorrowDocumentGuest.vue'
import BorrowDocumentCmplGuest from '@/views/guest/BorrowDocumentCmplGuest.vue'
import DocStrorage from '@/views/DocStrorage.vue'
import BorrowDocumentDetail from '@/views/BorrowDocumentDetail.vue'

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
    path: '/borrow-document-guest',
    name: 'BorrowDocumentGuest',
    component: BorrowDocumentGuest // 비회원 전용 BorrowDocument 페이지
  },
  {
    path: '/borrow-document-cmpl',
    name: 'BorrowDocumentCmpl',
    component: BorrowDocumentCmpl
  },
  {
    path: '/borrow-document-cmpl-guest',
    name: 'BorrowDocumentCmplGuest',
    component: BorrowDocumentCmplGuest // 비회원 전용 BorrowDocumentCmpl 페이지
  },
  {
    path: '/oauth',
    name: 'oauthRedirect',
    component: OAuthRedirect // OAuth 리디렉션 처리 페이지
  },
  {
    path: '/doc-storage',
    name: 'DocStorage',
    component: DocStrorage
  },
  {
    path: '/borrow-document/:id',
    name: 'BorrowDocumentDetail',
    component: BorrowDocumentDetail
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
