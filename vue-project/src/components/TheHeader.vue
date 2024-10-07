<template>
  <header class="app-header">
    <div class="logo" @click="openModal">
      <img src="@/assets/logo.png" alt="Logo" />
      모두의 문서
    </div>
    <div>{{ title }}</div>
    <!-- 사용자 정보 또는 로그인 버튼 -->
    <div v-if="nickname" class="user-info">
      <i class="fa fa-user-circle"></i> {{ nickname }} 님
      <button @click="logout">로그아웃</button>
    </div>
    <div v-else class="login-button">
      <button @click="loginWithKakao">카카오 로그인</button>
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
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isModalOpen = ref(false)

const router = useRouter()
const route = useRoute()

// 사용자 이름을 저장할 ref
const nickname = ref(null)

// 카카오 로그인 초기화
onMounted(() => {
  // 카카오 SDK 초기화
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('245d67827f146d497d2f2a3867ea8eef') // 여기에 카카오에서 발급받은 JavaScript 키 입력
    console.log('Kakao SDK initialized')
  }

  // localStorage에서 닉네임 불러오기 (로그인 상태 유지)
  const storedNickname = localStorage.getItem('nickname')
  if (storedNickname) {
    nickname.value = storedNickname
  } else {
    // 토큰 확인하여 로그인 상태 유지
    displayToken()
  }
})

// 카카오 로그인 함수
const loginWithKakao = () => {
  window.Kakao.Auth.authorize({
    redirectUri: 'http://localhost:5173/oauth' // 카카오 개발자 사이트에 등록한 리디렉션 URI
  })
}

// 로그인 상태 확인 및 토큰 저장
const displayToken = () => {
  const token = window.Kakao.Auth.getAccessToken()

  console.log('displayToken :: ', token)

  if (token) {
    console.log('액세스 토큰 ~~~', token) // 액세스 토큰이 존재하는지 확인
    localStorage.setItem('accessToken', token) // 액세스 토큰을 localStorage에 저장

    // 사용자 정보 요청
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (res) => {
        nickname.value = res.properties.nickname // 로그인한 사용자 이름 저장
        localStorage.setItem('nickname', nickname.value) // 사용자 정보를 로컬 스토리지에 저장
        console.log('로그인 성공:', nickname.value)
      },
      fail: (error) => {
        console.error('사용자 정보 요청 실패:', error)
      }
    })
  } else {
    console.log('액세스 토큰이 없습니다.')
  }
}

// 쿠키 삭제 함수
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// 로그아웃 함수
const logout = () => {
  const accessToken = localStorage.getItem('accessToken') // localStorage에서 액세스 토큰 가져오기

  console.log('Haeder accessToken ::', accessToken)

  if (!accessToken) {
    console.error('액세스 토큰이 없습니다.')
    return
  }

  // 서버 측 로그아웃 (카카오 로그아웃 API 호출)
  fetch('https://kapi.kakao.com/v1/user/unlink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 포함하여 서버 로그아웃 요청
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' // 로그아웃 시 Content-Type 설정
    }
  })
    .then((response) => {
      console.log('response :: ', response)

      if (response.ok) {
        console.log('서버 로그아웃 성공')
        nickname.value = null // 로그아웃 후 사용자 이름 초기화

        return response.json()
      } else {
        return response.json().then((data) => {
          console.error('서버 로그아웃 실패:', data, '응답 상태:', response.status)
        })
      }
    })
    .then((data) => {
      console.log('data :: ', data)

      console.log('============ test1 ============ ')

      // 클라이언트 측에서만 로그아웃 처리
      // 서버로 추가 요청을 보내지 않음, 쿠키, 세션, 로컬 스토리지 삭제
      localStorage.removeItem('nickname') // localStorage에서 사용자 정보 삭제
      localStorage.removeItem('accessToken') // localStorage에서 액세스 토큰 삭제
      console.log('클라이언트 로그아웃 성공')

      console.log('============ test2 ============ ')

      // 모든 쿠키 삭제
      document.cookie.split(';').forEach((cookie) => {
        const cookieName = cookie.split('=')[0].trim()
        deleteCookie(cookieName)
      })

      console.log('============ test3 ============ ')

      // 세션 스토리지 초기화
      sessionStorage.clear()

      // 모든 브라우저 캐시 삭제
      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name)
      })

      console.log('============ test4 ============ ')

      return data
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        console.error('이미 로그아웃 되었거나 토큰이 유효하지 않습니다.')
      } else {
        console.error('서버 로그아웃 요청 중 오류 발생:', error)
      }
    })
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
    return '문서작성을 취소하시겠습니까? \n 검색한 내역이 사라집니다.'
  } else if (route.name === 'BorrowDocument') {
    return '문서작성을 취소하시겠습니까? \n 작성한 내용이 사라집니다.'
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
  position: fixed; /* 화면 상단에 고정되도록 설정 */
  top: 0; /* 상단 위치를 0으로 설정 */
  left: 0; /* 좌측 위치를 0으로 설정 */
  width: 100%; /* 너비를 100%로 설정하여 화면 가로 전체를 차지 */
  display: flex; /* 자식 요소들을 플렉스 박스로 배치 */
  justify-content: space-between; /* 자식 요소들 간의 여백을 양쪽 끝에 배치 */
  align-items: center; /* 수직 정렬을 가운데로 설정 */
  background-color: #d4d7d6; /* 배경색을 설정 */
  padding: 20px; /* padding을 20px로 늘려 높이 증가 */
  height: 45px; /* 명시적으로 높이를 60px로 설정 */
  z-index: 1000; /* 다른 요소 위에 배치될 수 있도록 z-index 설정 */
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
