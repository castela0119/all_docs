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
import { useRoute, useRouter } from 'vue-router'
import jsPDF from 'jspdf' // jsPDF를 사용해 PDF로 내보내기

const route = useRoute()
const router = useRouter()

// 전달받은 데이터를 route.params에서 추출
const lenderName = route.params.lenderName
const borrowerName = route.params.borrowerName
const loanStartDate = route.params.loanStartDate
const loanEndDate = route.params.loanEndDate
const loanAmount = route.params.loanAmount
const interestRate = route.params.interestRate
const lenderIdNumber = route.params.lenderIdNumber
const lenderAddress = route.params.lenderAddress
const lenderPhoneNumber = route.params.lenderPhoneNumber
const borrowerIdNumber = route.params.borrowerIdNumber
const borrowerAddress = route.params.borrowerAddress
const borrowerPhoneNumber = route.params.borrowerPhoneNumber

// 문서 수정 페이지로 돌아가기
const goToEditDocument = () => {
  router.push({ name: 'paperForm', params: route.params }) // 작성된 데이터를 유지한 채로 돌아감
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}

.btn {
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

.a4-paper {
  background-color: white;
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
