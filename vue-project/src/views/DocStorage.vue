<template>
  <div class="storage-page">
    <h1 class="page-title">문서 보관함</h1>

    <!-- 문서 목록 섹션 -->
    <div v-if="savedDocuments.length" class="documents-grid">
      <div
        v-for="document in savedDocuments"
        :key="document.id"
        class="document-card"
        @click="goToDocumentDetail(document.id)"
      >
        <h3>{{ document.lenderName }} - {{ document.borrowerName }} 계약서</h3>
        <p>작성일: {{ formatDate(document.createdAt) }}</p>
      </div>
    </div>

    <!-- 저장된 문서가 없을 경우 -->
    <div v-else class="no-documents">
      <p>저장된 문서가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_APP_API_URL

const savedDocuments = ref([])
const router = useRouter()

// 사용자 계약서 불러오기 함수
const fetchSavedDocuments = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/loanContracts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })

    console.log('response :: ' + response.data)

    savedDocuments.value = response.data
  } catch (error) {
    console.error('Error fetching saved documents:', error)
    savedDocuments.value = []
  }
}

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('ko-KR', options)
}

// 컴포넌트 마운트 시 문서 가져오기
onMounted(() => {
  console.log('hihi')

  fetchSavedDocuments()
})

// 계약서 상세 페이지로 이동
const goToDocumentDetail = (documentId) => {
  router.push({ name: 'BorrowDocumentDetail', params: { id: documentId } })
}
</script>

<style scoped>
.storage-page {
  padding: 20px;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  color: #4a4a4a;
  text-align: center;
  background-color: #f4f6f8;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개씩 한 줄로 배치 */
  gap: 20px;
}

.document-card {
  background-color: #d8e3bc;
  border: 2px solid #8aa399; /* 두께를 2px로 늘리고, 색상을 좀 더 눈에 띄게 변경 */
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 약간의 그림자를 추가하여 입체감 부여 */
}

.document-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Hover 시 더 강조된 그림자 */
}

.document-card h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.document-card p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.no-documents {
  text-align: center;
  background-color: #f4f4f4; /* 약간의 회색 배경 */
  padding: 50px; /* 충분한 여백 */
  border: 2px dashed #d1d5db; /* 테두리를 점선으로 */
  border-radius: 10px;
  color: #777; /* 텍스트 색상 */
  font-size: 1.2rem; /* 텍스트 크기 */
}

.no-documents p {
  margin: 0;
  font-weight: 500; /* 텍스트 강조 */
}
</style>
