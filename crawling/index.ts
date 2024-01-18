const { spawn } = require('node:child_process');
const fs = require('fs');
const dataFromFrontend = {
  latitude: 37.5846557,
  longitude: 127.0292881,
  distanceStd: 500,
  reviewCountStd: 0,
  opentimeStd: 0,
  foodTypeStd: [
    '경양식',
    '곱창 전골/구이',
    '구내식당',
    '국/탕/찌개류',
    '국수/칼국수',
    '그 외 기타 간이 음식점',
    '기타 동남아식 전문',
    '기타 서양식 음식점',
    '기타 일식 음식점',
    '기타 한식 음식점',
    '김밥/만두/분식',
    '냉면/밀면',
    '닭/오리고기 구이/찜',
    '돼지고기 구이/찜',
    '떡/한과',
    '마라탕/훠궈',
    '무도 유흥 주점',
    '백반/한정식',
    '버거',
    '베트남식 전문',
    '복 요리 전문',
    '분류 안된 외국식 음식점',
    '뷔페',
    '빵/도넛',
    '생맥주 전문',
    '소고기 구이/찜',
    '아이스크림/빙수',
    '요리 주점',
    '일반 유흥 주점',
    '일식 면 요리',
    '일식 카레/돈가스/덮밥',
    '일식 회/초밥',
    '전/부침개',
    '족발/보쌈',
    '중국집',
    '치킨',
    '카페',
    '토스트/샌드위치/샐러드',
    '파스타/스테이크',
    '패밀리레스토랑',
    '피자',
    '해산물 구이/찜',
    '횟집',
  ],
  starStd: 0.0,
  locationName: '안암동',
};

// TypeScript에서 파이썬 스크립트 실행
const pythonProcess = spawn('python', [
  'crawling/crawling.py',
  JSON.stringify(dataFromFrontend),
]);

// 파이썬 스크립트가 종료되었을 때 이벤트 핸들러
pythonProcess.on('close', (code) => {
  if (code === 0) {
    // 파이썬 스크립트가 성공적으로 종료된 경우

    // JSON 파일 경로
    const jsonFilePath = 'output.json';

    // JSON 파일 읽기 함수
    function readJsonFile(filePath: string): any {
      try {
        // JSON 파일을 읽어서 파싱
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData);
      } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
      }
    }

    // JSON 파일 읽기
    const jsonData = readJsonFile(jsonFilePath);

    // 읽어온 JSON 데이터 활용
    if (jsonData) {
      console.log('Read JSON data:', jsonData);
      // 여기에서 필요한 작업 수행
    } else {
      console.error('Failed to read JSON data.');
    }
  } else {
    console.error(`Python script exited with code ${code}`);
  }
});
