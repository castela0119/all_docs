<template>
  <div class="container">
    <!-- 버튼 섹션 -->
    <div class="button-group">
      <button class="btn btn-right" @click="exportToPdf">내보내기 →</button>
    </div>

    <!-- A4 문서 미리보기 섹션 -->
    <div class="a4-paper">
      <h2 class="title">금전 차용증</h2>
      <p>
        {{ lenderName }}(이하 '채권자') 와 {{ borrowerName }}(이하 '채무자')는 아래와 같이 금전
        차용증을 작성하였습니다.
      </p>
      <ul>
        <li>대여 기간: {{ loanStartDate }} ~ {{ loanEndDate }}</li>
        <li>차용금액: ₩{{ loanAmount }}</li>
        <li>이자율: {{ interestRate }}%</li>
      </ul>
      <p class="date">작성일 : {{ currentDate }}</p>

      <h3>채권자 정보</h3>
      <ul>
        <li>성명: {{ lenderName }}</li>
        <li>주민등록번호: {{ lenderIdNumber }}</li>
        <li>주소: {{ lenderAddress }}</li>
        <li>전화번호: {{ lenderPhoneNumber }}</li>
      </ul>
      <h3>채무자 정보</h3>
      <ul>
        <li>성명: {{ borrowerName }}</li>
        <li>주민등록번호: {{ borrowerIdNumber }}</li>
        <li>주소: {{ borrowerAddress }}</li>
        <li>전화번호: {{ borrowerPhoneNumber }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const lenderName = ref('')
const borrowerName = ref('')
const loanStartDate = ref('')
const loanEndDate = ref('')
const loanAmount = ref('')
const interestRate = ref('')
const lenderIdNumber = ref('')
const lenderAddress = ref('')
const lenderPhoneNumber = ref('')
const borrowerIdNumber = ref('')
const borrowerAddress = ref('')
const borrowerPhoneNumber = ref('')
const currentDate = new Date().toLocaleDateString('ko-KR')

const apiUrl = import.meta.env.VITE_APP_API_URL

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      try {
        const response = await axios.get(`${apiUrl}/api/loanContracts/${newId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        })

        console.log('조회된 response :: ', response)

        const data = response.data
        lenderName.value = data.lenderName
        borrowerName.value = data.borrowerName
        loanStartDate.value = data.loanStartDate
        loanEndDate.value = data.loanEndDate
        loanAmount.value = data.loanAmount
        interestRate.value = data.interestRate
        lenderIdNumber.value = data.lenderIdNumber
        lenderAddress.value = data.lenderAddress
        lenderPhoneNumber.value = data.lenderPhoneNumber
        borrowerIdNumber.value = data.borrowerIdNumber
        borrowerAddress.value = data.borrowerAddress
        borrowerPhoneNumber.value = data.borrowerPhoneNumber
      } catch (error) {
        // 403 Forbidden 에러 발생 시 알림 표시 및 홈으로 리디렉션
        if (error.response && error.response.status === 403) {
          alert('권한이 없습니다')
          router.push({ name: 'Home' }) // 홈 페이지로 이동
        } else {
          console.error('Error fetching loan contract data:', error)
        }
      }
    }
  },
  { immediate: true }
)

// PDF로 내보내기 함수
const exportToPdf = () => {
  const element = document.querySelector('.a4-paper') // PDF로 변환할 HTML 요소 선택

  html2canvas(element, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const imgWidth = 210 // A4 너비
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)

    pdf.save('차용증.pdf')
  })
}
</script>

<style scoped>
.a4-paper {
  background-color: white;
  width: 210mm; /* A4 용지 너비 */
  height: 297mm; /* A4 용지 높이 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 20mm; /* A4 용지 안쪽 여백 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif; /* 읽기 쉬운 폰트 설정 */
  line-height: 1.6; /* 줄 간격을 늘려 가독성 향상 */
  margin-bottom: 40px;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding-left: 0;
}

ul li {
  margin-bottom: 10px; /* 항목 간 간격 조정 */
}

h3 {
  font-size: 1.3rem;
  margin-top: 30px; /* 섹션 사이에 충분한 간격 추가 */
  margin-bottom: 10px; /* 제목과 항목 사이 간격 추가 */
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ccc; /* 제목 아래에 구분선 추가 */
  padding-bottom: 5px;
}

p {
  margin-bottom: 15px; /* 일반 텍스트의 상하 간격 */
}

.date {
  text-align: right;
  margin-top: 30px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}

.btn {
  margin-top: 70px;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn-right {
  background-color: #ffc4c4;
}
</style>
