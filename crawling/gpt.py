import pandas as pd
from geopy.distance import geodesic
import random
import requests
from bs4 import BeautifulSoup

#CSV 파일 로드
df = pd.read_csv('Seoul_2309.csv', sep=',', encoding='utf-8-sig')

#나중에 받아올 변수들
user_location = (37.5826497929824, 127.028844976742)
distanceStd = 500 #500m 기준으로 설정
reviewCountStd = 0 #리뷰 필터 0명 기준
opentimeStd = 0 #현재 운영중
foodTypeStd = ['경양식', '곱창 전골/구이', '구내식당', '국/탕/찌개류', '국수/칼국수', 
                  '그 외 기타 간이 음식점', '기타 동남아식 전문', '기타 서양식 음식점', 
                  '기타 일식 음식점', '기타 한식 음식점', '김밥/만두/분식', '냉면/밀면', 
                  '닭/오리고기 구이/찜', '돼지고기 구이/찜', '떡/한과', '마라탕/훠궈', 
                  '무도 유흥 주점', '백반/한정식', '버거', '베트남식 전문', '복 요리 전문', 
                  '분류 안된 외국식 음식점', '뷔페', '빵/도넛', '생맥주 전문', '소고기 구이/찜', 
                  '아이스크림/빙수', '요리 주점', '일반 유흥 주점', '일식 면 요리', 
                  '일식 카레/돈가스/덮밥', '일식 회/초밥', '전/부침개', '족발/보쌈', '중국집', 
                  '치킨', '카페', '토스트/샌드위치/샐러드', '파스타/스테이크', '패밀리레스토랑', 
                  '피자', '해산물 구이/찜', '횟집'] #음식종류 제한 없음
starStd = 0.0 #현재 별점 제한 없음

#범위 줄이기
# df = df.loc[(df['행정동명'] == '안암동') | (df['행정동명'] == '보문동') | (df['행정동명'] == '용신동') | (df['행정동명'] == '삼선동') | (df['행정동명'] == '청량리동') | (df['행정동명'] == '종암동') | (df['행정동명'] == '동선동')]
df = df.loc[(df['행정동명'] == '안암동')]

#거리 필터링
def filter_dist_restaurants(row):
    restaurant_location = (row['위도'], row['경도'])
    return geodesic(user_location, restaurant_location).meters <= distanceStd

#음식 종류 필터링
def filter_type_restaurants(row):
    restaurant_type = row['상권업종소분류명']
    return restaurant_type in foodTypeStd

#500m 이내의 식당만 필터링
df = df[df.apply(filter_dist_restaurants, axis=1)]

#음식종류 필터링
df = df[df.apply(filter_type_restaurants, axis=1)]

print(df)


if not df.empty:
    #랜덤으로 식당 추천
    recommended_restaurant = random.choice(df.to_dict('records'))
    print(f"추천 식당: {recommended_restaurant['상호명']}, 행정동명: {recommended_restaurant['행정동명']}")

    #식당 정보 찾아오기
    #어떤 좌표에서 음식점을 검색했을 때의 정보 구하기
    url = 'https://map.naver.com/p/api/search/allSearch?query=%s&type=all&searchCoord=%s%%3B%s&boundary=' % (recommended_restaurant['상호명'], user_location[1], user_location[0])
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        data = data["result"]["place"]["list"][0]

        # 여기 쓰여진 정보만 가져오기
        keys_to_extract = ["id"]
        selected_restaurant = {key: data[key] for key in keys_to_extract if key in data}

        #선택받은 음식점의 메인 화면 불러오기
        url = 'https://pcmap.place.naver.com/restaurant/%s' % (selected_restaurant['id'])
        response = requests.get(url)

        soup = BeautifulSoup(response.text, 'html.parser')

        # 이름에 해당하는 내용 가져오기
        first_content = soup.select_one('#_title > div > span.Fc1rA')
        print("이름:", first_content.text if first_content else 'Not found')
        # 음식점 종류에 해당하는 내용 가져오기
        second_content = soup.select_one('#_title > div > span.DJJvD')
        print("음식점 종류:", second_content.text if second_content else 'Not found')
        # 별점에 해당하는 내용 가져오기
        third_content = soup.select_one('#app-root > div > div > div > div.place_section.no_margin.OP4V8 > div.zD5Nm.undefined > div.dAsGb > span.PXMot.LXIwF')
        print("별점:", third_content.text if third_content else 'Not found')
        # 방문자 리뷰에 해당하는 내용 가져오기
        fourth_content = soup.select_one('#app-root > div > div > div > div.place_section.no_margin.OP4V8 > div.zD5Nm.undefined > div.dAsGb > span:nth-child(2) > a')
        print("방문자 리뷰:", fourth_content.text if fourth_content else 'Not found')
        # 블로그 리뷰에 해당하는 내용 가져오기
        fifth_content = soup.select_one('#app-root > div > div > div > div.place_section.no_margin.OP4V8 > div.zD5Nm.undefined > div.dAsGb > span:nth-child(3) > a')
        print("블로그 리뷰:", fifth_content.text if fifth_content else 'Not found')
        # 주소에 해당하는 내용 가져오기
        sixth_content = soup.select_one('#app-root > div > div > div > div:nth-child(5) > div > div:nth-child(2) > div.place_section_content > div > div.O8qbU.tQY7D > div > a > span.LDgIH')
        print("주소:", sixth_content.text if sixth_content else 'Not found')
        # 현재 영업 여부에 해당하는 내용 가져오기
        seventh_content = soup.select_one('#app-root > div > div > div > div:nth-child(5) > div > div:nth-child(2) > div.place_section_content > div > div.O8qbU.pSavy > div > a > div > div > div > em')
        print("현재 영업 여부:", seventh_content.text if seventh_content else 'Not found')
        # 영업 시간에 해당하는 내용 가져오기
        eighth_content = soup.select_one('#app-root > div > div > div > div:nth-child(6) > div > div:nth-child(2) > div.place_section_content > div > div.O8qbU.pSavy > div > a > div > div > div > span > time')
        print("영업 시간:", eighth_content.text if eighth_content else 'Not found')

    else:
        print("요청 실패:", response.status_code)

else:
    print("조건에 해당하는 음식점이 없습니다.")

