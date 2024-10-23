<template>
  <div class="storage-page">
    <h1>보관함</h1>
    <ul>
      <li
        v-for="document in savedDocuments"
        :key="document.id"
        @click="goToDocumentDetail(document.id)"
      >
        {{ document.title }}
      </li>
    </ul>
    <p v-if="!savedDocuments.length">저장된 문서가 없습니다.</p>
    <!-- No documents message -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios' // Assuming axios is used for API requests

const savedDocuments = ref([])
const router = useRouter()

// Fetch user's saved documents on component mount
const fetchSavedDocuments = async () => {
  try {
    const response = await axios.get('/api/documents/saved', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
      }
    })
    savedDocuments.value = response.data.documents
  } catch (error) {
    console.error('Error fetching saved documents:', error)
    savedDocuments.value = []
  }
}

onMounted(() => {
  fetchSavedDocuments() // Fetch documents when the component is mounted
})

const goToDocumentDetail = (documentId) => {
  router.push({ name: 'DocumentDetail', params: { id: documentId } })
}
</script>

<style scoped>
/* Add necessary styles here */
</style>
