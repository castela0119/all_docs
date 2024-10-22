<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>회원가입</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="nickname">닉네임</label>
          <input type="text" v-model="nickname" required />
        </div>
        <div>
          <label for="email">이메일</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="modal-buttons">
          <button type="button" @click="close">취소</button>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 폼 데이터
const nickname = ref('')
const email = ref('')
const password = ref('')

// 부모 컴포넌트에서 전달된 props와 emits
// const props = defineProps(['onClose'])
const emit = defineEmits(['register-success'])

// 회원가입 처리 로직
const handleRegister = () => {
  if (nickname.value && email.value && password.value) {
    emit('register-success', nickname.value)
    close()
  } else {
    alert('회원가입 정보를 모두 입력해주세요.')
  }
}

// 모달 닫기
const close = () => {
  emit('onClose')
}
</script>

<style scoped>
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
  width: 300px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
