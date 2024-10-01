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
  router.push({ name: 'BorrowDocument', params: route.params }) // 작성된 데이터를 유지한 채로 돌아감
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
