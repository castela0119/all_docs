<template>
    <div>
      카카오 로그인 처리 중...
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  
  const router = useRouter();
  
  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // 인가 코드 추출
  
    if (code) {
      console.log('인가 코드:', code);
      getAccessToken(code);
    } else {
      console.error('인가 코드를 받지 못했습니다.');
      router.push('/'); // 인가 코드가 없으면 홈으로 리다이렉트
    }
  });
  
  // 액세스 토큰 요청
  const getAccessToken = (code) => {
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const clientId = 'adb6f77da0f678a2516b555d621e8aa0'; // REST API 키
    const redirectUri = 'http://localhost:5173/oauth'; // 리다이렉션 URI
    const grantType = 'authorization_code';
  
    const body = new URLSearchParams({
      grant_type: grantType,
      client_id: clientId,
      redirect_uri: redirectUri,
      code: code,
    });
  
    fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })
      .then((response) => response.json())
      .then((data) => {

        console.log('data :::: ', data);

        console.log('액세스 토큰:', data.access_token);

        // 액세스 토큰으로 사용자 정보 요청
        getUserInfo(data.access_token); 

        // 액세스 토큰을 localStorage에 저장
        localStorage.setItem('accessToken', data.access_token);
      })
      .catch((error) => {
        console.error('토큰 요청 실패:', error);
      });
  };
  
 // 사용자 정보 요청 함수
const getUserInfo = (accessToken) => {
  fetch('https://kapi.kakao.com/v2/user/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('사용자 정보:', data);
      localStorage.setItem('nickname', data.properties.nickname); // 사용자 정보를 로컬 스토리지에 저장
      // 로그인 성공 후 홈 페이지로 리다이렉트
      router.push('/'); // 홈으로 이동
    })
    .catch((error) => {
      console.error('사용자 정보 요청 실패:', error);
      router.push('/'); // 사용자 정보 요청 실패 시 홈으로 이동
    });
};
</script>
  