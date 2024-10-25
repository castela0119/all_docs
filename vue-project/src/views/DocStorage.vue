<template>
  <div class="storage-page">
    <h1 class="page-title">보관함</h1>

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
    <p v-else>저장된 문서가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const savedDocuments = ref([])
const router = useRouter()

// 사용자 계약서 불러오기 함수
const fetchSavedDocuments = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/loanContracts', {
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
  padding: 10px 20px;
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
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.document-card:hover {
  transform: translateY(-5px);
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
</style>
