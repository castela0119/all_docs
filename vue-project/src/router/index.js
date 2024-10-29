import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PaperType from '@/views/PaperType.vue' // PaperType 페이지
import BorrowDocument from '@/views/BorrowDocument.vue'
import BorrowDocumentCmpl from '@/views/BorrowDocumentCmpl.vue'
import OAuthRedirect from '@/views/OAuthRedirect.vue'
import BorrowDocumentGuest from '@/views/guest/BorrowDocumentGuest.vue'
import BorrowDocumentCmplGuest from '@/views/guest/BorrowDocumentCmplGuest.vue'
import DocStorage from '@/views/DocStorage.vue'
import BorrowDocumentDetail from '@/views/BorrowDocumentDetail.vue'

// 로그인 확인 함수
function isAuthenticated() {
  return !!localStorage.getItem('userToken') // 토큰이 있으면 로그인된 상태
}

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
    component: BorrowDocument,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next() // 로그인되어 있으면 BorrowDocument로 접근 허용
      } else {
        next({ name: 'BorrowDocumentGuest' }) // 로그인되어 있지 않으면 게스트 페이지로 리다이렉트
      }
    }
  },
  {
    path: '/borrow-document-guest',
    name: 'BorrowDocumentGuest',
    component: BorrowDocumentGuest // 비회원 전용 BorrowDocument 페이지
  },
  {
    path: '/borrow-document-cmpl',
    name: 'BorrowDocumentCmpl',
    component: BorrowDocumentCmpl,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next() // 로그인되어 있으면 BorrowDocumentCmpl로 접근 허용
      } else {
        next({ name: 'BorrowDocumentCmplGuest' }) // 로그인되지 않으면 게스트 페이지로 리다이렉트
      }
    }
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
    component: DocStorage,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next() // 로그인된 경우 문서 저장소 페이지로 이동
      } else {
        next({ name: 'Home' }) // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      }
    }
  },
  {
    path: '/borrow-document-detail/:id',
    name: 'BorrowDocumentDetail',
    component: BorrowDocumentDetail,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next() // 로그인되어 있으면 BorrowDocumentCmpl로 접근 허용
      } else {
        next({ name: 'Home' }) // 로그인되지 않으면 게스트 페이지로 리다이렉트
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
