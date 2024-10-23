<template>
  <header class="app-header">
    <div class="logo" @click="openModal('home')">
      <img src="@/assets/logo.png" alt="Logo" />
      모두의 문서
    </div>
    <div>{{ title }}</div>

    <!-- 사용자 정보 또는 로그인/회원가입 버튼 -->
    <div v-if="nickname" class="user-info">
      <i class="fa fa-user-circle"></i> {{ nickname }} 님
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
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Pinia 스토어 불러오기
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'
const router = useRouter()

const nickname = ref(null)
const isLoginModalOpen = ref(false)
const isRegisterModalOpen = ref(false)
const authStore = useAuthStore()

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
  }
}

// 모달 닫기
const closeModal = () => {
  isLoginModalOpen.value = false
  isRegisterModalOpen.value = false
}

// 로그인 성공 처리
const handleLoginSuccess = (userNickname) => {
  nickname.value = userNickname
  localStorage.setItem('nickname', userNickname)
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
}

const goToStorage = () => {
  router.push({ name: 'DocStorage' })
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
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
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
