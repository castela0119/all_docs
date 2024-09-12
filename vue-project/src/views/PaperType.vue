<template>
    <div class="paper-selection-page">
      <!-- 검색 부분 -->
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="문서 검색 하기 ex. 레포트, 차용증"
          class="search-input"
        />
        <button class="search-button" @click="onSearch">
          <i class="fa fa-search"></i>
        </button>
      </div>
  
      <!-- 문서 선택 부분 -->
      <div class="document-carousel">
        <button class="carousel-control left" @click="prevDocument">
          <i class="fa fa-chevron-left"></i>
        </button>
        <div class="document-list" ref="documentListRef">
          <div
            v-for="(document, index) in documents"
            :key="index"
            class="document-item"
            :class="{ selected: selectedDocument === document.name }"
          >
            <img :src="document.image" :alt="document.name" class="document-preview" />
            <div class="document-info">
              <div class="document-name">{{ document.name }}</div>
              <div class="document-actions">
                <button class="select-button" @click="selectDocument(document.name)">
                  선택
                </button>
                <div class="formats">
                  <span v-for="format in document.formats" :key="format" class="format">
                    {{ format }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control right" @click="nextDocument">
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const searchQuery = ref(''); // 검색어 상태
  const documents = ref([
    { name: 'Riga', image: 'path/to/riga.png', formats: ['WORD', 'PDF'] },
    { name: 'Rotterdam', image: 'path/to/rotterdam.png', formats: ['WORD', 'PDF'] },
    { name: 'Budapest', image: 'path/to/budapest.png', formats: ['WORD', 'PDF'], special: true },
    { name: 'Chicago', image: 'path/to/chicago.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    { name: 'Sydney', image: 'path/to/sydney.png', formats: ['WORD', 'PDF'] },
    
  ]);
  
  const selectedDocument = ref(null); // 선택된 문서 상태
  
  const documentListRef = ref(null); // document-list 엘리먼트 참조
  
  const onSearch = () => {
    console.log('검색 실행: ', searchQuery.value);
    // 검색 기능을 여기에 추가
  };
  
  const selectDocument = (name) => {
    selectedDocument.value = name;
    console.log(`${name} 문서가 선택되었습니다.`);
  };
  
  const prevDocument = () => {
    if (documentListRef.value) {
      documentListRef.value.scrollLeft -= 200; // 이전 문서로 200px 스크롤 이동
    }
  };
  
  const nextDocument = () => {
    if (documentListRef.value) {
      documentListRef.value.scrollLeft += 200; // 다음 문서로 200px 스크롤 이동
    }
  };
  </script>
  
  <style scoped>
  .paper-selection-page {
    text-align: center;
  }
  
  .search-container {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .search-input {
    padding: 10px;
    width: 400px;
    border-radius: 25px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
  
  .search-button {
    background-color: #ccc;
    border: none;
    padding: 10px;
    border-radius: 50%;
    margin-left: 10px;
  }
  
  .document-carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  
  .document-list {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth; /* 스크롤이 부드럽게 이동하도록 설정 */
  }
  
  .document-item {
    display: inline-block;
    width: 150px;
    margin: 0 10px;
    scroll-snap-align: center;
  }
  
  .document-preview {
    width: 100%;
    border-radius: 8px;
  }
  
  .document-info {
    text-align: center;
    margin-top: 10px;
  }
  
  .document-name {
    font-size: 1.1rem;
    font-weight: bold;
  }
  
  .document-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .select-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    margin-top: 10px;
  }
  
  .formats {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
  
  .format {
    background-color: #eee;
    border-radius: 4px;
    padding: 3px 5px;
    margin: 0 2px;
  }
  
  .selected .select-button {
    background-color: #28a745;
  }
  
  .carousel-control {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
  </style>
  