<template>
  <div id="app">
    <TheHeader />
    <main class="main-content">
      <h2>일반 문서부터 법적 문서까지 간편하게 작성</h2>
      <div class="steps">
        <div class="step">STEP1<br>문서 선택</div>
        <div class="step">STEP2<br>템플릿에 작성</div>
        <div class="step">STEP3<br>문서 추출하기<br><small>PDF or Word</small></div>
      </div>
      <RouterLink to="/paper-type">
      <button class="select-button">문서 선택 하기</button>
    </RouterLink>
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'HomeView',
  components: {
    
  }
}
</script>

<style scoped>
#app {
  text-align: center;
}

.main-content {
  padding: 20px;
}

.main-content h2 {
  margin-bottom: 20px;
}

.steps {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.step {
  background-color: #d3e0fc;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  font-size: 1rem;
}

.select-button {
  background-color: #f28b82;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>