// src/plugins/apiUrl.js
export default {
    install: (app) => {
      // import.meta.env 를 통해 환경변수에서 apiUrl 가져옴
      const apiUrl = import.meta.env.VITE_API_URL;
  
      // 전역 속성에 추가
      app.config.globalProperties.$apiUrl = apiUrl;
    }
  };  