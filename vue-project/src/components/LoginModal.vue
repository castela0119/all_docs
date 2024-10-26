<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>로그인</h2>
      <form @submit.prevent="handleLogin">
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
          <button type="submit">로그인</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Pinia 스토어 불러오기
import axios from 'axios'
import { useQuasar } from 'quasar' // Quasar 사용

// `inject`를 통해 전역으로 제공된 `apiUrl`을 가져옴
const apiUrl = inject('apiUrl')

const router = useRouter()

const $q = useQuasar() // Quasar Notify 사용

// 폼 데이터
const email = ref('')
const password = ref('')

const authStore = useAuthStore()

// 부모 컴포넌트에서 전달된 props와 emits
// const props = defineProps(['onClose'])
const emit = defineEmits(['login-success'])

const handleLogin = async () => {
  try {
    const response = await axios.post(`${apiUrl}/api/users/login`, {
      email: email.value,
      password: password.value
    })

    if (response.status === 200) {
      // 로그인 성공, 서버로부터 닉네임과 토큰을 전달받음
      const { nickname, token } = response.data

      console.log('response.data :: ', response.data)

      // 닉네임과 토큰을 로컬스토리지에 저장
      localStorage.setItem('nickname', nickname)
      localStorage.setItem('userToken', token)
      authStore.setToken(token)

      // 로그인 성공 이벤트 발생 및 모달 닫기
      emit('login-success', nickname)
      close()

      // Toast 메시지 표시
      $q.notify({
        type: 'positive',
        message: '로그인 성공!',
        position: 'top',
        timeout: 2000
      })

      // 홈으로 이동
      router.push({ name: 'Home' })
    } else if (response.status === 401) {
      // 인증 실패: 잘못된 이메일 또는 비밀번호
      $q.notify({
        type: 'negative',
        message: '이메일 또는 비밀번호가 잘못되었습니다.',
        position: 'top',
        timeout: 2000
      })
    } else {
      // 기타 예외 상황
      $q.notify({
        type: 'negative',
        message: '로그인에 실패했습니다.',
        position: 'top',
        timeout: 2000
      })
    }
  } catch (error) {
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 코드가 있는 경우
      if (error.response.status === 400) {
        $q.notify({
          type: 'negative',
          message: '잘못된 요청입니다. 입력 정보를 확인해주세요.',
          position: 'top',
          timeout: 2000
        })
      } else if (error.response.status === 401) {
        $q.notify({
          type: 'negative',
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
          position: 'top',
          timeout: 2000
        })
      } else if (error.response.status === 500) {
        $q.notify({
          type: 'negative',
          message: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          position: 'top',
          timeout: 2000
        })
      } else {
        $q.notify({
          type: 'negative',
          message: `로그인 중 알 수 없는 오류가 발생했습니다. 상태 코드: ${error.response.status}`,
          position: 'top',
          timeout: 2000
        })
      }
    } else if (error.request) {
      // 서버로 요청이 전송되었으나 응답이 없을 때
      $q.notify({
        type: 'negative',
        message: '서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.',
        position: 'top',
        timeout: 2000
      })
    } else {
      // 그 외의 에러 (요청이 전송되지 않은 경우 등)
      $q.notify({
        type: 'negative',
        message: '로그인 요청 중 문제가 발생했습니다.',
        position: 'top',
        timeout: 2000
      })
    }
    console.error(error)
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
