<template>
  <header class="app-header">
    <div class="logo" @click="openModal">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
    <div>{{ title }}</div>
    <div class="user-icon">
      <i class="fa fa-user-circle"></i>
    </div>

    <!-- 모달 -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <p>{{ modalContent }}</p>
        <div class="modal-buttons">
          <button @click="closeModal">취소</button>
          <button @click="confirmModal">확인</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isModalOpen = ref(false)
const router = useRouter()
const route = useRoute()

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// 현재 경로에 따라 모달의 내용을 동적으로 설정
const modalContent = computed(() => {
  if (route.name === 'PaperType') {
    return '문서작성을 취소하시겠습니까? 검색한 내역이 사라집니다.'
  } else if (route.name === 'BorrowDocument') {
    return '문서작성을 취소하시겠습니까? 작성한 내용이 사라집니다.'
  } else {
    return '기본 내용입니다'
  }
})

const confirmModal = () => {
  isModalOpen.value = false
  router.push('/') // 확인 버튼을 누르면 홈으로 이동
}
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f7f6;
  padding: 10px;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.logo img {
  height: 12px;
  margin-right: 10px;
}

.user-icon i {
  font-size: 1.5rem;
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
}

/* 버튼 스타일 */
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
</style>
