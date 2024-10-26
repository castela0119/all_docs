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
        <div>
          <label for="passwordConfirm">비밀번호 확인</label>
          <input type="password" v-model="passwordConfirm" required />
          <p v-if="passwordMismatch" class="error-message">비밀번호가 일치하지 않습니다.</p>
        </div>
        <div class="modal-buttons">
          <button type="button" @click="close">취소</button>
          <button type="submit" :disabled="passwordMismatch">회원가입</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useQuasar } from 'quasar' // Quasar 사용

const router = useRouter()
const $q = useQuasar() // Quasar Notify 사용

// 폼 데이터
const nickname = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

// 비밀번호 일치 여부 확인
const passwordMismatch = computed(
  () => password.value !== passwordConfirm.value && passwordConfirm.value !== ''
)

// 비밀번호가 일치하지 않는 경고 메시지 표시 여부
const showPasswordMismatch = ref(false)

// 비밀번호 확인 입력시 일치 여부 체크
watch(passwordConfirm, (newValue) => {
  if (newValue !== '') {
    showPasswordMismatch.value = passwordMismatch.value
  } else {
    showPasswordMismatch.value = false
  }
})

// 부모 컴포넌트에서 전달된 props와 emits
const emit = defineEmits(['register-success'])

// 회원가입 처리 로직
const handleRegister = async () => {
  if (!passwordMismatch.value && nickname.value && email.value && password.value) {
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        nickname: nickname.value,
        email: email.value,
        password: password.value
      })

      if (response.status === 200) {
        // 회원가입 성공 알림 (Toast 형식)
        $q.notify({
          type: 'positive',
          message: '회원가입이 완료되었습니다!',
          position: 'top',
          timeout: 2000
        })

        // 모달 닫기 및 홈으로 이동
        close()
        router.push({ name: 'Home' })
      }
    } catch (error) {
      // 실패 알림
      if (error.response && error.response.status === 400) {
        // 중복된 이메일 알림
        $q.notify({
          type: 'negative',
          message: '이미 가입되어있는 이메일입니다. 다른 이메일을 사용해주세요.',
          position: 'top',
          timeout: 2000
        })
      } else {
        console.error(error)
        $q.notify({
          type: 'negative',
          message: '회원가입 중 오류가 발생했습니다.',
          position: 'top',
          timeout: 2000
        })
      }
    }
  } else {
    $q.notify({
      type: 'warning',
      message: '회원가입 정보를 모두 입력해주세요.',
      position: 'top',
      timeout: 2000
    })
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
  background-color: hsl(211, 22%, 54%);
  color: white;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

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

.error-message {
  color: red;
  font-size: 0.9rem;
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 1.25rem; /* 크기 줄임 */
  font-weight: 600; /* 두께를 조금 두껍게 */
  color: #333; /* 텍스트 색상 변경 */
  text-align: center; /* 가운데 정렬 */
  border-bottom: 2px solid #7bb2ee; /* 하단에 파란색 선 추가 */
  padding-bottom: 10px; /* 하단 패딩 추가 */
}
</style>
