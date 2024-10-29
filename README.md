# 모두의문서

## 1. FIGMA 기획
![Design Preview](assets/preview-image.png)

[View the Design on Figma](https://www.figma.com/design/LfSURIapN7wPURtKt3GV6d/%EB%AA%A8%EB%91%90%EC%9D%98%EB%AC%B8%EC%84%9C?node-id=0-1&t=9lQOcW9HK9zy0i0Y-1)

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

