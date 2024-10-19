<template>
  <div class="container-contents">
    <!-- 왼쪽 입력 폼 (스크롤 가능, 스크롤바 숨김) -->
    <div class="left-contents">
      <h2>금전 차용증 작성</h2>

      <!-- 추가 입력 필드 -->
      <div class="section1">
        <div class="form-group">
          <label>채권자 이름</label>
          <input
            v-model="lenderName"
            @input="handleInput1"
            type="text"
            placeholder="채권자 이름을 입력하세요"
          />
        </div>

        <div class="form-group">
          <label>채무자 이름</label>
          <input
            :value="borrowerName"
            @input="handleInput2"
            type="text"
            placeholder="채무자 이름을 입력하세요"
          />
        </div>
      </div>
      <div class="empty"></div>

      <!-- 대여기간 입력 필드 (시작 날짜와 끝 날짜 추가) -->
      <div class="section2">
        <div class="form-group">
          <label>대여 기간</label>
          <div class="date-inputs">
            <input v-model="loanStartDate" type="date" class="date-picker" />
            <span>~</span>
            <input v-model="loanEndDate" type="date" class="date-picker" />
          </div>
        </div>

        <div class="form-group">
          <label>차용금액</label>
          <input
            @input="onInput"
            v-model="formattedLoanAmount"
            type="text"
            placeholder="차용금액을 입력하세요"
          />
        </div>

        <div class="form-group">
          <label>연 이자율(%)</label>
          <input
            v-model="interestRate"
            @input="checkInterestRate"
            type="number"
            placeholder="연 이자율을 입력하세요"
          />
        </div>
      </div>
      <div class="empty"></div>
      <!-- 추가 입력 필드들 -->
      <div class="section3">
        <h3>채권자 상세 정보</h3>
        <div class="form-group">
          <label>채권자 주민등록번호</label>
          <input
            v-model="lenderIdNumber"
            @input="formatIdNumber"
            type="text"
            placeholder="주민등록번호를 입력하세요"
          />
        </div>
        <div class="form-group">
          <label>채권자 주소</label>
          <input v-model="lenderAddress" type="text" placeholder="주소를 입력하세요" />
        </div>
        <div class="form-group">
          <label>채권자 전화번호</label>
          <input
            v-model="lenderPhoneNumber"
            @input="formatPhoneNumber('lender')"
            type="text"
            placeholder="전화번호를 입력하세요"
          />
        </div>
      </div>
      <div class="empty"></div>
      <div class="section4">
        <h3>채무자 상세 정보</h3>
        <div class="form-group">
          <label>채무자 주민등록번호</label>
          <input
            v-model="borrowerIdNumber"
            @input="formatIdNumber"
            type="text"
            placeholder="주민등록번호를 입력하세요"
          />
        </div>
        <div class="form-group">
          <label>채무자 주소 (등본상 주소)</label>
          <input v-model="borrowerAddress" type="text" placeholder="주소를 입력하세요" />
        </div>
        <div class="form-group">
          <label>채무자 전화번호</label>
          <input
            v-model="borrowerPhoneNumber"
            @input="formatPhoneNumber('borrower')"
            type="text"
            placeholder="전화번호를 입력하세요"
          />
        </div>
      </div>

      <!-- 작성 완료 버튼 추가 -->
      <div class="button-group">
        <button class="btn btn-left" @click="goToPaperType">문서선택</button>
        <button class="btn btn-right" @click="handleComplete">작성완료</button>
      </div>
    </div>

    <div class="right-contents">
      <!-- 오른쪽 A4 용지 미리보기 (스크롤 없음) -->
      <div class="preview-section">
        <div class="a4-paper">
          <h2 class="title">금전 차용증</h2>
          <p>
            {{ lenderName }}(이하 '채권자') 와 {{ borrowerName }}(이하 '채무자')는 아래와 같이 금전
            차용증을 작성하였습니다.
          </p>
          <ul>
            <li>대여 기간: {{ loanStartDate }} ~ {{ loanEndDate }}</li>
            <li>차용금액: {{ formattedLoanAmount }}</li>
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
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

// Vue Router 사용 설정
const router = useRouter()

// 데이터 정의
const borrowerName = ref('')
const lenderName = ref('')
const loanStartDate = ref('') // 대여 시작일
const loanEndDate = ref('') // 대여 종료일
const loanAmount = ref('')
const formattedLoanAmount = ref('')
const interestRate = ref('')
const currentDate = new Date().toLocaleDateString('ko-KR')

// 채권자 정보
const lenderIdNumber = ref('')
const lenderAddress = ref('')
const lenderPhoneNumber = ref('')

// 채무자 정보
const borrowerIdNumber = ref('')
const borrowerAddress = ref('')
const borrowerPhoneNumber = ref('')

const $q = useQuasar() // Quasar의 알림 사용

onMounted(() => {
  const storedData = localStorage.getItem('borrowObj')
  if (storedData) {
    const borrowObj = JSON.parse(storedData)
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

// 숫자를 원화 형식으로 포맷하는 함수
const formatCurrency = (num) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0 // 소수점 이하 표시하지 않음
  }).format(num)
}

// input 이벤트 발생 시 숫자를 포맷하여 formattedLoanAmount에 저장
const onInput = (event) => {
  const inputValue = event.target.value.replace(/[₩,]/g, '') // 기존 원화 기호 및 콤마 제거
  if (!isNaN(inputValue) && inputValue !== '') {
    // 숫자인 경우만 포맷 적용
    loanAmount.value = inputValue
    formattedLoanAmount.value = formatCurrency(inputValue)
  } else {
    formattedLoanAmount.value = '' // 유효하지 않은 입력일 경우 빈 값 처리
  }
}

// 연 이자율을 체크하는 함수
const checkInterestRate = () => {
  if (interestRate.value > 20) {
    $q.notify({
      type: 'warning',
      message: '2024년 기준, 연 20% 이자를 초과할 수 없습니다.',
      position: 'top',
      timeout: 3000
    })
    interestRate.value = 20 // 이자율을 20%로 제한
  }
}

// 주민등록번호 입력 시 포맷팅 및 제한
const formatIdNumber = () => {
  let inputValue = lenderIdNumber.value.replace(/\D/g, '') // 숫자 이외의 문자 제거

  // 6자리 초과하면 하이픈 추가
  if (inputValue.length > 6) {
    inputValue = `${inputValue.slice(0, 6)}-${inputValue.slice(6)}`
  }

  // 주민등록번호가 숫자 7자리를 넘지 않도록 제한
  if (inputValue.length > 8) {
    $q.notify({
      type: 'warning',
      message: '주민번호 뒷자리는 수집하지 않습니다. 문서 출력 후 직접 입력해주세요.',
      position: 'top',
      timeout: 3000
    })
    inputValue = inputValue.slice(0, 8) // 숫자 7자리까지만 유지 (980101-1)
  }

  lenderIdNumber.value = inputValue // 포맷된 값으로 업데이트
}

// 전화번호 포맷팅 함수
const formatPhoneNumber = (type) => {
  // 해당 전화번호 변수 선택(조건부 연산자 문법)
  const phoneNumber = type === 'lender' ? lenderPhoneNumber : borrowerPhoneNumber

  // 입력값에서 숫자만 남기기
  let inputValue = phoneNumber.value.replace(/\D/g, '')

  // 번호 형식으로 변환
  if (inputValue.length > 3) {
    inputValue = `${inputValue.slice(0, 3)}-${inputValue.slice(3)}`
  }
  if (inputValue.length > 8) {
    inputValue = `${inputValue.slice(0, 8)}-${inputValue.slice(8)}`
  }

  // 11자리 전화번호로 제한 (010-1234-1234)
  if (inputValue.length > 13) {
    inputValue = inputValue.slice(0, 13)
  }

  phoneNumber.value = inputValue // 포맷된 값으로 업데이트
}

const handleInput1 = (event) => {
  lenderName.value = event.target.value
}

const handleInput2 = (event) => {
  borrowerName.value = event.target.value
}

const goToPaperType = () => {
  // 문서 선택 페이지로 이동 (경로는 문서 선택 페이지의 라우트에 맞게 설정)
  router.push({ name: 'PaperType' })
}

const handleComplete = () => {
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

  // localStorage에 데이터를 저장
  localStorage.setItem('borrowObj', JSON.stringify(borrowObj))

  // 페이지 이동
  router.push({ name: 'BorrowDocumentCmpl' })
}
</script>

<style scoped>
.container-contents {
  display: flex;
  /* width: 100%; 가로 화면 전체를 차지 */
  height: 1000px;
}

.form-section {
  /* width: 340px; */
  /* height: 100%; */
  /* overflow-y: scroll; */
  padding: 25px;
  background-color: rgb(230 230 230);
  position: fixed; /* 화면에 고정 */
  left: 0; /* 왼쪽 끝으로 */
  top: 25px; /* 상단에 맞춤 */
}

/*  */

.left-contents {
  width: 340px;
  height: 100%;
  overflow-y: scroll;
  padding: 25px;
  background-color: rgb(230 230 230);
  /* position: fixed; 화면에 고정 */
  /* left: 0; 왼쪽 끝으로 */
  /* top: 25px; 상단에 맞춤 */
}

/* 스크롤바 숨기기 */
.left-contents::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.right-contents {
  background-color: #ccc;
  /* padding: 25px; */
  flex: 1;
  /* top: 25px; 상단에 맞춤 */
  height: 100%;
}

.section1 {
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #f1f1f1;
}

.section2 {
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #f1f1f1;
}

.section3 {
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #f1f1f1;
}

.section4 {
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #f1f1f1;
}

.empty {
  margin: 15px; /* 섹션간 여백생성 */
}

/* A4 용지 미리보기 */
.preview-section {
  /* width: calc(100% - 340px); form-section의 너비를 제외한 나머지 너비 */
  /* margin-left: 340px; form-section의 너비만큼 왼쪽 여백 추가 */
  /* display: flex; */
  justify-content: center; /* A4 용지를 중앙에 배치 */
  /* align-items: flex-start; A4 용지가 위로 밀리지 않게 설정 */
  width: 100%;
  height: 1000px;
  /* padding: 20px; A4 용지 주변에 여백 추가 */
  /* padding-top: 70px; */
  /* margin-top: 30px; */
}

.a4-paper {
  /* width: 210mm; */
  /* height: 297mm; */
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
  border: 1px solid #0a0909; /* 모든 면에 동일하게 검정선 추가 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  position: relative;
  /* margin-top: 0; */
  /* overflow: hidden; */
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding-left: 0;
}

.date {
  text-align: right;
  margin-top: 30px;
}

/* 가독성을 위한 상하 여백 */
.form-group {
  margin-top: 7px; /* 상하 간격을 더 넓게 */
  margin-right: 5px;
}

.form-group input,
.form-group label {
  line-height: 1.5;
}

/* 입력 필드 간 좌우 간격과 텍스트 박스의 패딩 조정 */
.form-group input {
  width: 100%;
  padding: 12px 15px; /* 텍스트 필드의 패딩 조정 */
  margin-top: 8px; /* 라벨과 입력 필드 사이 간격 */
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* 텍스트 크기 줄이기 */
h2 {
  font-size: 1.5rem; /* 기본 크기보다 작게 조정 */
}

h3 {
  font-size: 1.2rem; /* 기본 크기보다 작게 조정 */
}

p,
li {
  margin-bottom: 20px; /* 텍스트 상하 간격 조정 */
}

/* 날짜 입력 필드 (시작날짜, 종료날짜를 나란히 표시) */
.date-inputs {
  display: flex;
  align-items: center;
  /* margin-top: 8px; 라벨과 날짜 입력 필드 사이 간격 추가 */
}

.date-inputs input {
  width: 128px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.button-group {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}

.btn {
  padding: 15px 30px;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn-left {
  background-color: #b3d1ff; /* 문서선택 버튼 색상 */
  color: #000;
}

.btn-right {
  background-color: #ffc4c4; /* 작성완료 버튼 색상 */
  color: #000;
}

.btn-left:hover,
.btn-right:hover {
  opacity: 0.8;
}

/* 화살표 스타일링 */
.btn-left::before {
  content: '← ';
}

.btn-right::after {
  content: ' →';
}
</style>
