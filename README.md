# 모두의문서

# [모두의 문서](https://findalldocs.com/)

## 1. 프로젝트 소개
**프로젝트 요약**  
모두의문서는 사용자들이 다양한 문서(예: 대출 계약서, 고용 계약서, 부동산 계약서 등)를 쉽게 생성, 저장 및 관리할 수 있는 웹 애플리케이션입니다. 이 프로젝트는 문서 관리의 복잡성을 줄이고 사용자가 필요할 때 필요한 서류를 빠르게 생성하고 보관할 수 있도록 돕습니다.

**데모 링크 또는 미리보기**  
[모두의문서 데모 보기](https://www.figma.com/design/LfSURIapN7wPURtKt3GV6d/%EB%AA%A8%EB%91%90%EC%9D%98%EB%AC%B8%EC%84%9C?node-id=0-1&t=9lQOcW9HK9zy0i0Y-1)
![프로젝트 미리보기](vue-project/assets/figma-image.png)

---

## 2. 기능 목록
- **문서 작성**: 문서 양식을 선택하여 미리보기 환경에서 문서를 쉽게 작성할 수 있습니다.
- **문서 저장**: 로그인한 사용자는 문서를 생성 및 저장할 수 있습니다.
- **문서 조회**: 로그인한 사용자는 저장한 문서를 쉽게 조회하고 관리할 수 있습니다.
- **PDF 추출**: 생성한 문서를 PDF 형식으로 저장하거나 다운로드할 수 있습니다.

---

## 3. 기술 스택 및 아키텍처

### Frontend
- **Vue.js**: 사용자 인터페이스와 동적인 웹 애플리케이션 개발을 위해 사용했습니다.
- **Quasar**: Vue.js 기반으로 UI 구성 요소와 스타일링을 간편하게 제공합니다.

### Backend
- **Spring Boot**: REST API 서버로 활용하여 데이터 처리 및 비즈니스 로직을 관리합니다.

### Database
- **MongoDB**: 비관계형 데이터베이스로, 문서와 사용자 데이터를 저장하고 관리합니다.

### DevOps / 인프라
- **AWS Route 53**: 도메인 이름 등록 및 DNS 관리를 통해 사용자들이 AllDocs에 접근할 수 있도록 지원합니다.
- **AWS S3**: 정적 파일 (프론트엔드 빌드 파일)을 호스팅하여 빠르고 안정적으로 서비스를 제공합니다.
- **AWS EC2**: 백엔드 서버(Spring Boot)와 MongoDB를 호스팅하여 안정적인 서버 환경을 제공합니다.

### 아키텍처 다이어그램 (선택 사항)
```plaintext
사용자 (User) 
      |
      ▼
Route 53 (DNS)
      |
      ├────────▶ S3 (Frontend) - Vue.js 애플리케이션
      |
      └────────▶ EC2 (Backend) - Spring Boot API
                      |
                      ▼
                MongoDB (Database)

---

## 4. 주요 폴더구조
```plaintext
src
├── assets
├── components
│   ├── icons
│   ├── LoginModal.vue
│   ├── RegisterModal.vue
│   ├── TheFooter.vue
│   └── TheHeader2.vue
│
├── plugins
│   └── apiUrl.js
│
├── router
│   └── index.js
│
├── stores
│   ├── auth.js
│   └── counter.js
│
├── views
│   ├── guest
│   │   ├── BorrowDocumentCmplGuest.vue
│   │   └── BorrowDocumentGuest.vue
│   ├── BorrowDocument.vue
│   ├── BorrowDocumentDetail.vue
│   ├── DocStorage.vue
│   ├── HomeView.vue
│   ├── OAuthRedirect.vue
│   └── PaperType.vue
│
├── App.vue
└── main.js

---

# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### ec2 내 서버실행 명령어

```sh
pm2 start npm --nmae "vue-project" -- run dev
```

### ec2 내 서버종료

```sh
pm2 delete all # 모든 서버 종료

pm2 delete 0(서버id) # 특정 서버 종료
```

### ec2 내 서버실행 확인

```sh
pm2 list
```

## Git Commit Message 규칙

프로젝트의 Git commit 메시지는 최소한의 규칙을 따르며, 다음과 같은 타입으로 나누어 작성합니다.

### 규칙 형식


- **`<type>`**: `feat`, `fix`, `del`, `chore` 중 하나.
- **`<subject>`**: 변경 사항에 대한 간결한 설명.


- **`<type>`**: `feat`, `fix`, `del`, `chore`, `docs` 중 하나.
- **`<subject>`**: 변경 사항에 대한 간결한 설명.

### Commit Message Type

1. **`feat`**: 새로운 기능 추가
   - 예: `feat: add user login functionality`

2. **`fix`**: 버그 수정
   - 예: `fix: correct form validation issue`

3. **`del`**: 불필요한 코드 또는 파일 삭제
   - 예: `del: remove deprecated API`

4. **`chore`**: 설정 변경, 외부 의존성 관리 등 코드 외의 작업
   - 예: `chore: update package dependencies`

5. **`docs`**: 문서 수정
   - 예: `docs: update API documentation` 

