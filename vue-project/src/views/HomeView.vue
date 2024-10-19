<template>
  <div id="app">
    <main class="main-content">
      <h2>일반 문서부터 법적 문서까지 간편하게 작성</h2>
      <div class="steps">
        <div class="step">STEP1<br />문서 선택</div>
        <div class="step">STEP2<br />템플릿에 작성</div>
        <div class="step">STEP3<br />문서 추출하기<br /><small>PDF</small></div>
      </div>
      <RouterLink to="/paper-type">
        <button class="select-button">문서 선택 하기</button>
      </RouterLink>
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
#app {
  text-align: center;
  min-height: 100%; /* 전체 화면 높이를 차지하게 함 */
  width: 100%; /* 전체 화면 너비를 차지하게 함 */
}

.main-content {
  padding: 40px 20px;
  width: 100%;
}

.main-content h2 {
  margin-bottom: 30px;
  font-size: 1.5rem;
}

.steps {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.step {
  background-color: #d3e0fc;
  padding: 20px 30px; /* 가로 패딩: 30px */
  margin: 0 20px; /* 좌우 마진: 20px */
  border-radius: 8px;
  font-size: 1.1rem;
}

.select-button {
  background-color: #f28b82;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 20px;
  width: calc((90px + 60px) * 3 + 40px * 2); /* 버튼 너비 설정 */
}

.select-button:hover {
  background-color: #e57373;
}
</style>
