<template>
  <header class="app-header">
    <div class="logo" @click="openModal">
      <img src="@/assets/logo.png" alt="Logo" />
      모두의 문서
    </div>
    <div>{{ title }}</div>
    <!-- 사용자 정보 또는 로그인 버튼 -->
    <div v-if="userName" class="user-info">
      <i class="fa fa-user-circle"></i> {{ userName }} 님
      <button @click="kakaoLogout">로그아웃</button>
    </div>
    <div v-else class="login-button">
      <button @click="startKakaoLogin">카카오 로그인</button>
      <!-- <a :href="kakaoLoginUrl">카카오 로그인</a> -->
    </div>

    <!-- 모달 -->
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isModalOpen = ref(false)

const router = useRouter()
const route = useRoute()

// 사용자 이름을 저장할 reactive 변수
const userName = ref('')

// 카카오 로그인 초기화
onMounted(() => {
  // 카카오 SDK 초기화- 이 코드가 먼저 실행되지 않으면 .Kakao.Auth.authorize 를 실행할 수 없음
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('2c983a73d398d486d74522b65c7d4366') // 여기에 카카오에서 발급받은 JavaScript 키 입력
    console.log('Kakao SDK initialized')
  }

  const userInfo = getUserInfoFromCookie()
  if (userInfo && userInfo.name) {
    userName.value = userInfo.name // 사용자 이름을 reactive 변수에 저장
  }
})

// 쿠키에서 사용자 정보 읽기
const getUserInfoFromCookie = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; userInfo=`)
  if (parts.length === 2) return JSON.parse(parts.pop().split(';').shift())
}

const startKakaoLogin = () => {
  window.Kakao.Auth.authorize({
    redirectUri: 'http://localhost:5173/oauth' // 카카오 개발자 사이트에 등록한 리디렉션 URI
  })
}

// 쿠키 삭제 함수
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// 카카오 로그아웃 함수
const kakaoLogout = async () => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1]

  if (!accessToken) {
    console.error('액세스 토큰이 없습니다. 로그아웃을 수행할 수 없습니다.')
    return
  }

  try {
    // 서버 측 로그아웃 (카카오 로그아웃 API 호출)
    const response = await fetch('https://kapi.kakao.com/v1/user/unlink', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 포함하여 서버 로그아웃 요청
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' // 로그아웃 시 Content-Type 설정
      }
    })

    if (response.ok) {
      console.log('서버 로그아웃 성공')

      // 쿠키에서 사용자 정보 삭제
      deleteCookie('userInfo') // 사용자 정보 쿠키 삭제

      console.log('클라이언트 로그아웃 성공: 사용자 정보 쿠키 삭제 완료.')
      location.reload()
    } else {
      const data = await response.json()
      console.error('서버 로그아웃 실패:', data, '응답 상태:', response.status)
    }
  } catch (error) {
    console.error('서버 로그아웃 요청 중 오류 발생:', error)
  }
}

const openModal = () => {
  console.log('route.name ::', route.name)

  if (route.name === 'Home') {
    // HomeView에서는 새로고침
    window.location.reload()
  } else {
    // 다른 페이지에서는 모달 오픈
    isModalOpen.value = true
  }
}

const closeModal = () => {
  isModalOpen.value = false
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
  /* position: fixed; 화면 상단에 고정되도록 설정 */
  /* top: 0; 상단 위치를 0으로 설정 */
  /* left: 0; 좌측 위치를 0으로 설정 */
  width: 100%; /* 너비를 100%로 설정하여 화면 가로 전체를 차지 */
  display: flex; /* 자식 요소들을 플렉스 박스로 배치 */
  /* justify-content: space-between; 자식 요소들 간의 여백을 양쪽 끝에 배치 */
  /* align-items: center; 수직 정렬을 가운데로 설정 */
  background-color: #d4d7d6; /* 배경색을 설정 */
  padding: 10px; /* padding을 20px로 늘려 높이 증가 */
  /* height: 45px; 명시적으로 높이를 60px로 설정 */
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

.modal-text {
  white-space: pre-line; /* \n이 줄바꿈으로 처리되도록 설정 */
}
</style>
