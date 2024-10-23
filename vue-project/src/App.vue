<template>
  <div class="app-container">
    <TheHeader />
    <div class="content-wrapper">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TheHeader from '@/components/TheHeader2.vue'
import TheFooter from './components/TheFooter.vue'

// headerTitle 상태를 관리
const headerTitle = ref('모두의 문서')

const isLoggedIn = ref(false)

const authStore = useAuthStore()

// onMounted 훅에서 로그인 상태를 복원
onMounted(() => {
  authStore.loadTokenFromStorage() // 앱 로드 시 localStorage에서 토큰을 다시 로드
  const token = localStorage.getItem('userToken') // localStorage에서 토큰 가져오기

  console.log('token ::: ' + token)

  if (token) {
    // 토큰이 있으면 로그인된 상태로 설정
    isLoggedIn.value = true
    // 추가로 사용자 정보를 로드하거나 토큰 검증을 서버에서 할 수도 있음
  } else {
    // 토큰이 없으면 로그인 해제 상태
    isLoggedIn.value = false
  }
})

// 현재 경로를 확인하여 모달이 필요한 경우에만 띄우는 로직
const route = useRoute()
// 라우트가 변경될 때마다 title 업데이트
watch(route, (newRoute) => {
  if (newRoute.name === 'Home') {
    headerTitle.value = '모두의 문서'
  } else if (newRoute.name === 'PaperType') {
    headerTitle.value = '문서 선택'
  } else {
    headerTitle.value = '기본 제목'
  }
})
</script>

<style lang="css" scoped>
.app-container {
  width: 100%;
}
</style>
