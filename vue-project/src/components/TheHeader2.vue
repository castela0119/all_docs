<template>
  <header class="app-header">
    <div class="logo" @click="openModal('home')">
      <img src="@/assets/logo.png" alt="Logo" />
      <!-- 로그인 여부에 따라 텍스트 변경 -->
      {{ nickname ? `${nickname}의 문서` : '모두의 문서' }}
    </div>
    <div>{{ title }}</div>

    <!-- 사용자 정보 또는 로그인/회원가입 버튼 -->
    <div v-if="nickname" class="user-info">
      <!-- 보관함 버튼 -->
      <button @click="goToStorage">보관함</button>
      <button @click="logout">로그아웃</button>
    </div>
    <div v-else class="auth-buttons">
      <button @click="openModal('login')">로그인</button>
      <button @click="openModal('register')">회원가입</button>
    </div>

    <!-- 로그인 모달 -->
    <LoginModal v-if="isLoginModalOpen" @onClose="closeModal" @login-success="handleLoginSuccess" />

    <!-- 회원가입 모달 -->
    <RegisterModal
      v-if="isRegisterModalOpen"
      @onClose="closeModal"
      @register-success="handleRegisterSuccess"
    />

    <!-- 홈 모달 -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <p class="modal-text">{{ modalContent }}</p>
        <div class="modal-buttons">
          <button @click="closeModal">취소</button>
          <button @click="confirmModal">확인</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Pinia 스토어 불러오기
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

const router = useRouter()
const route = useRoute()

const nickname = ref(null)
const isLoginModalOpen = ref(false)
const isRegisterModalOpen = ref(false)
const authStore = useAuthStore()

const isModalOpen = ref(false)

// 새로고침 시 로그인 상태 복원
onMounted(() => {
  authStore.loadFromStorage() // localStorage에서 로그인 상태 복원

  // 새로고침 시 localStorage에서 닉네임 복원
  const storedNickname = localStorage.getItem('nickname')
  if (storedNickname) {
    nickname.value = storedNickname
  }
})

// 모달 열기
const openModal = (type) => {
  if (type === 'login') {
    isLoginModalOpen.value = true
  } else if (type === 'register') {
    isRegisterModalOpen.value = true
  } else if (route.name !== 'Home') {
    // 다른 페이지에서는 모달 오픈
    isModalOpen.value = true
  } else if (type === 'home') {
    // HomeView에서는 새로고침
    window.location.reload()
  }
}

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false
  isLoginModalOpen.value = false
  isRegisterModalOpen.value = false
}

// 로그인 성공 처리
const handleLoginSuccess = (userNickname) => {
  nickname.value = userNickname
  localStorage.setItem('nickname', userNickname)

  // 홈으로 리다이렉트
  router.push({ name: 'Home' }) // 'Home' 라우트로 이동
}

// 회원가입 성공 처리
const handleRegisterSuccess = (userNickname) => {
  nickname.value = userNickname
  localStorage.setItem('nickname', userNickname)
}

// 로그아웃 처리
const logout = () => {
  localStorage.removeItem('nickname')
  authStore.clearToken() // 로그아웃 시 토큰 제거
  nickname.value = null // Vue 상태에서 닉네임 제거
  alert('로그아웃 되었습니다.')

  // 홈으로 리다이렉트
  router.push({ name: 'Home' }) // 'Home' 라우트로 이동
}

const goToStorage = () => {
  router.push({ name: 'DocStorage' })
}

// 현재 경로에 따라 모달의 내용을 동적으로 설정
const modalContent = computed(() => {
  if (route.name === 'PaperType') {
    return '문서선택을 취소하시겠습니까? \n 홈으로 이동합니다.'
  } else if (route.name === 'BorrowDocument') {
    return '문서작성을 취소하시겠습니까? \n 작성한 내용이 사라질 수 있습니다.'
  } else {
    return '홈으로 이동하시겠습니까?'
  }
})

const confirmModal = () => {
  isModalOpen.value = false
  router.push('/') // 확인 버튼을 누르면 홈으로 이동
}
</script>

<style scoped>
.app-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #d4d7d6;
  padding: 10px;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.logo img {
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-buttons button {
  padding: 5px 15px;
  border: none;
  background-color: #f4f5bce0;
  color: rgb(1, 1, 1);
  border-radius: 4px;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background-color: #f5f5f5;
  color: #333;
}

.modal-buttons button:last-child {
  background-color: #007bff;
  color: white;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
