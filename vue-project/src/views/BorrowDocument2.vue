<template>
  <div class="container">
    <div class="content">
      <div class="left-content">Left Content</div>
      <div class="right-content">Right Content</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  margin-top: 45px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
}

.content {
  display: flex;
  flex-direction: row; /* 항상 가로 배치 유지 */
  flex: 1;
  overflow: hidden; /* 스크롤바가 필요할 때만 표시 */
}

.left-content {
  background-color: #f4f4f4;
  padding: 20px;
  /* flex: 0 0 250px; 고정된 너비 */
  min-width: 200px; /* 최소 너비 설정 */
  overflow-y: auto; /* 콘텐츠가 넘칠 경우 스크롤 */
  /* position: relative; 위치 설정을 위해 relative 설정 */
  left: 0; /* 화면 왼쪽 끝에 고정 */
}

.right-content {
  background-color: #ffffff;
  padding: 20px;
  flex: 1; /* 남은 모든 공간을 차지 */
  overflow-y: auto; /* 콘텐츠가 넘칠 경우 스크롤 */
  margin-left: 0; /* left-content에 붙여줌 */
}

/* 미디어 쿼리, 화면 너비가 768px 이하일 때 특정 CSS 스타일을 적용 */
@media (max-width: 768px) {
  .left-content {
    flex: 0 0 200px; /* flex-grow: 0 (확장하지 않음), flex-shrink: 0 (축소하지 않음), 너비를 200px로 고정 */
    left: 0;
  }

  .right-content {
    flex: 1; /* flex-grow: 1 (남은 공간을 모두 차지), flex-shrink: 1 (공간이 부족할 때 축소), 기본 너비는 auto */
    margin-left: 0; /* left-content에 붙여서 유지 */
  }
}
</style>
