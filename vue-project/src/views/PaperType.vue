<template>
  <div class="paper-selection-page">
    <!-- 검색 부분 -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="문서 검색 하기 ex. 레포트, 차용증"
        class="search-input"
      />
      <button class="search-button" @click="onSearch">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide"
        transition-next="slide"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide
          v-for="(document, index) in documents"
          :key="index"
          :name="document.name"
          class="column no-wrap flex-center"
        >
          <!-- Display the document image -->
          <!-- <img :src="document.image" alt="document image" style="width: 56px; height: 56px" /> -->

          <!-- Display the document name -->
          <div class="q-mt-md text-center clickable" @click="goToPage(document.routeName)">
            {{ document.name }}
          </div>

          <!-- Display formats if necessary -->
          <!-- <div class="q-mt-md text-center">
            {{ document.formats.join(', ') }}
          </div> -->
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'

const slide = ref('')

const searchQuery = ref('') // 검색어 상태

const documents = ref([
  { name: '차용증', routeName: 'BorrowDocument' },
  { name: '근로계약서', routeName: 'EmploymentContract' },
  { name: '임대차계약서', routeName: 'LeaseContract' },
  { name: '금전대차', routeName: 'LoanDocument' }
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

const onSearch = () => {
  console.log('검색 실행: ', searchQuery.value)
  // 검색 기능을 여기에 추가
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
</style>
