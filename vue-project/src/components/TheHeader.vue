<template>
    <header class="app-header">
    <RouterLink to="/">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo">
        
      </div>
    </RouterLink>
      <div>{{ title }}</div>
      <div class="user-icon">
        <i class="fa fa-user-circle"></i>
      </div>
    </header>
</template>
  
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});

</script>
  
  <style scoped>
  .app-header {
    position: fixed; /* 상단에 고정 */
    top: 0; /* 화면의 최상단에 위치 */
    left: 0; /* 화면의 좌측에 위치 */
    width: 100%; /* 화면 전체 너비를 차지 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f7f6;
    padding: 10px;
    z-index: 1000; /* 다른 요소들 위에 표시되도록 우선순위 설정 */
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
  </style>  