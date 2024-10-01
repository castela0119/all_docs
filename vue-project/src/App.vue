<template>
  <TheHeader :title="headerTitle"></TheHeader>
  <TheView></TheView>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheView from '@/views/TheView.vue'
import TheHeader from '@/components/TheHeader.vue'

// headerTitle 상태를 관리
const headerTitle = ref('모두의 문서')

// 현재 라우트를 가져오는 훅
const route = useRoute()

// 라우트가 변경될 때마다 title 업데이트
watch(route, (newRoute) => {
  if (newRoute.name === 'Home') {
    headerTitle.value = '모두의 문서'
  } else if (newRoute.name === 'PaperType') {
    headerTitle.value = '문서 선택'
  } else {
    headerTitle.value = '기본 제목'
  }
})
</script>
