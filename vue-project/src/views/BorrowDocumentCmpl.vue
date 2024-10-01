<template>
  <div class="container">
    <!-- 버튼 섹션 -->
    <div class="button-group">
      <button class="btn btn-left" @click="goToEditDocument">← 문서 수정</button>
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
import { ref, onMounted } from 'vue' // onMounted를 vue에서 가져옴
import { useRoute, useRouter } from 'vue-router'
import jsPDF from 'jspdf' // jsPDF를 사용해 PDF로 내보내기

const route = useRoute()
const router = useRouter()

// const { dataObj } = history.state // 이렇게 받는다.

// 각 데이터를 ref로 선언
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
const currentDate = ref('')

// onMounted에서 window.history.borrowObj 값을 가져와서 설정
onMounted(() => {
  const borrowObj = JSON.parse(localStorage.getItem('borrowObj'))

  console.log('borrowObj :: ', borrowObj)

  if (borrowObj) {
    lenderName.value = borrowObj.lenderName
    borrowerName.value = borrowObj.borrowerName
    loanStartDate.value = borrowObj.loanStartDate
    loanEndDate.value = borrowObj.loanEndDate
    loanAmount.value = borrowObj.loanAmount
    interestRate.value = borrowObj.interestRate
    lenderIdNumber.value = borrowObj.lenderIdNumber
    lenderAddress.value = borrowObj.lenderAddress
    lenderPhoneNumber.value = borrowObj.lenderPhoneNumber
    borrowerIdNumber.value = borrowObj.borrowerIdNumber
    borrowerAddress.value = borrowObj.borrowerAddress
    borrowerPhoneNumber.value = borrowObj.borrowerPhoneNumber
  }
})

console.log('route.state :: ', route.state)
console.log('route.params :: ', route.params)
console.log('lenderName :: ', lenderName)

// 문서 수정 페이지로 돌아가기
const goToEditDocument = () => {
  const borrowObj = {
    lenderName: lenderName.value,
    borrowerName: borrowerName.value,
    loanStartDate: loanStartDate.value,
    loanEndDate: loanEndDate.value,
    loanAmount: loanAmount.value,
    interestRate: interestRate.value,
    lenderIdNumber: lenderIdNumber.value,
    lenderAddress: lenderAddress.value,
    lenderPhoneNumber: lenderPhoneNumber.value,
    borrowerIdNumber: borrowerIdNumber.value,
    borrowerAddress: borrowerAddress.value,
    borrowerPhoneNumber: borrowerPhoneNumber.value
  }

  // 데이터를 localStorage에 저장
  localStorage.setItem('borrowObj', JSON.stringify(borrowObj))

  // borrowDocument 페이지로 이동
  router.push({ name: 'borrowDocument' })
}

// PDF로 내보내기 함수
const exportToPdf = () => {
  const doc = new jsPDF({
    format: 'a4'
  })

  doc.text('차 용 증', 105, 20, { align: 'center' })
  doc.text(`채권자: ${lenderName}`, 20, 40)
  doc.text(`채무자: ${borrowerName}`, 20, 50)
  doc.text(`주민등록번호: ${lenderIdNumber}`, 20, 60)
  doc.text(`등본상 주소: ${borrowerAddress}`, 20, 70)
  doc.text(`연락처: ${lenderPhoneNumber}`, 20, 80)
  doc.text(`차용 금액: ${loanAmount}`, 20, 90)
  doc.text(`대여 기간: ${loanStartDate} ~ ${loanEndDate}`, 20, 100)
  doc.text(`이자율: ${interestRate}%`, 20, 110)

  // PDF 저장
  doc.save('차용증.pdf')
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
  justify-content: space-between;
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

.btn-left {
  background-color: #b3d1ff;
}

.btn-right {
  background-color: #ffc4c4;
}
</style>
