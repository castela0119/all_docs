<template>
  <div class="button-container">
    <button
      v-for="(document, index) in documents"
      :key="index"
      class="custom-button"
      :disabled="!document.usable"
      @mouseenter="showTooltip(document)"
      @mouseleave="hideTooltip"
      @click="handleClick(document)"
    >
      {{ document.name }}
    </button>
    <span v-if="tooltipVisible" class="tooltip">{{ tooltipMessage }}</span>
    <!-- 툴팁 메시지 -->
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'

const slide = ref('')

// documents 배열 선언
const documents = ref([
  { name: '차용증', routeName: 'BorrowDocument', usable: true },
  { name: '근로계약서', routeName: 'EmploymentContract', usable: false },
  { name: '임대차계약서', routeName: 'LeaseContract', usable: false },
  { name: '금전대차', routeName: 'LoanDocument', usable: false }
])

// documents 배열이 변경될 때 첫 번째 슬라이드 설정
watch(
  documents,
  (newDocuments) => {
    if (newDocuments.length > 0) {
      slide.value = newDocuments[0].name
    }
  },
  { immediate: true }
) // 최초 로드시에도 반응

// 라우터를 사용하기 위한 설정
const router = useRouter()

const tooltipMessage = ref('준비 중입니다') // 툴팁 메시지
const tooltipVisible = ref(false) // 툴팁 표시 여부

const showTooltip = (document) => {
  if (!document.usable) {
    tooltipVisible.value = true
  }
}

const hideTooltip = () => {
  tooltipVisible.value = false
}

const handleClick = (document) => {
  if (document.usable) {
    goToPage(document.routeName) // 페이지 이동 처리
  }
}

// 페이지 이동 함수
const goToPage = (documentName) => {
  console.log('documentName', documentName)
  router.push({ name: documentName })
}
</script>

<style scoped>
.paper-selection-page {
  text-align: center;
}

.search-container {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  padding: 10px;
  width: 400px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.search-button {
  background-color: #ccc;
  border: none;
  padding: 10px;
  border-radius: 50%;
  margin-left: 10px;
}

.document-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.document-list {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth; /* 스크롤이 부드럽게 이동하도록 설정 */
}

.document-item {
  display: inline-block;
  width: 150px;
  margin: 0 10px;
  scroll-snap-align: center;
}

.document-preview {
  width: 100%;
  border-radius: 8px;
}

.document-info {
  text-align: center;
  margin-top: 10px;
}

.document-name {
  font-size: 1.1rem;
  font-weight: bold;
}

.document-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.select-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-top: 10px;
}

.formats {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.format {
  background-color: #eee;
  border-radius: 4px;
  padding: 3px 5px;
  margin: 0 2px;
}

.selected .select-button {
  background-color: #28a745;
}

.carousel-control {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.clickable {
  cursor: pointer; /* 마우스 포인터가 손 모양으로 바뀜 */
}

.button-container {
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 배치 가능하게 설정 */
  justify-content: space-around; /* 버튼 간 간격을 고르게 배치 */
  padding-top: 100px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 100px;
  gap: 10px; /* 버튼 간격 설정 */
}

.custom-button {
  flex: 1 1 calc(25% - 10px); /* 각 버튼을 25% 너비로 설정 (한 줄에 4개) */
  padding: 10px;
  background-color: #f0dc86;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.custom-button:hover {
  background-color: #e3c896; /* 마우스 올릴 때 색상 변화 */
}

.tooltip {
  position: absolute;
  background-color: #b3d1ff; /* 툴팁 배경색 */
  color: #757171; /* 텍스트 색상 */
  padding: 5px;
  border-radius: 4px;
  z-index: 10;
  margin-top: 5px; /* 버튼 아래에 툴팁 위치 조정 */
}
</style>
