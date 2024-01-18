import pandas as pd
from geopy.distance import geodesic
import random
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import json
import sys

#백엔드에서 input.json 받아오기
data_from_frontend = json.loads(sys.argv[1])
id = data_from_frontend

#선택받은 음식점의 메인 화면 불러오기
url = 'https://pcmap.place.naver.com/restaurant/%s' % (id)
response = requests.get(url)

soup = BeautifulSoup(response.content.decode('utf-8', 'replace'), 'html.parser')

# id 가져오기
print("id:", id)

# 이름에 해당하는 내용 가져오기
store_name = soup.select_one('#_title > div > span.Fc1rA')
print("이름:", store_name.text if store_name else 'Not found')

# 음식점 종류에 해당하는 내용 가져오기
store_type = soup.select_one('#_title > div > span.DJJvD')
print("음식점 종류:", store_type.text if store_type else 'Not found')

# 별점에 해당하는 내용 가져오기
store_star = soup.select_one('#app-root > div > div > div > div.place_section.no_margin.OP4V8 > div.zD5Nm.undefined > div.dAsGb > span.PXMot.LXIwF')
print("별점:", store_star.text if store_star else 'Not found')

# 블로그 리뷰에 해당하는 내용 가져오기
store_review1 = soup.select_one('#app-root > div > div > div > div.place_section.no_margin.OP4V8 > div.zD5Nm.undefined > div.dAsGb > span:nth-child(2) > a')
print("블로그 리뷰:", store_review1.text if store_review1 else 'Not found')

# 방문자 리뷰에 해당하는 내용 가져오기
store_review2 = soup.select_one('#app-root > div > div > div > div.place_section.no_margin.OP4V8 > div.zD5Nm.undefined > div.dAsGb > span:nth-child(3) > a')
print("방문자 리뷰:", store_review2.text if store_review2 else 'Not found')

# 주소에 해당하는 내용 가져오기
store_address = soup.select_one('#app-root > div > div > div > div:nth-child(5) > div > div:nth-child(2) > div.place_section_content > div > div.O8qbU.tQY7D > div > a > span.LDgIH')
print("주소:", store_address.text if store_address else 'Not found')

# 현재 영업 여부에 해당하는 내용 가져오기
store_now_working = soup.select_one('#app-root > div > div > div > div:nth-child(5) > div > div:nth-child(2) > div.place_section_content > div > div.O8qbU.pSavy > div > a > div > div > div > em')
print("현재 영업 여부:", store_now_working.text if store_now_working else 'Not found')

# 영업 시간에 해당하는 내용 가져오기
store_working_time = soup.select_one('div.O8qbU.pSavy > div > a > div > div > div > span > time')
print("영업 시간:", store_working_time.text if store_working_time else 'Not found')

#json 파일 작성
json_data = {
    "placeId":id,
    "name":store_name.text,
    "type":store_type.text,
    "star":store_star.text[2:] if store_star else 'Not found',
    "review":str(int(store_review1.text[6:]) if store_review1 else 0 + int(store_review2.text[6:]) if store_review2 else 0),
    "address":store_address.text,
    "now_working":store_now_working.text if store_now_working else 'Not found',
    "working_time":store_working_time.text if store_working_time else 'Not found',
}

# Python 데이터를 JSON 문자열로 변환
json_data = json.dumps(json_data, indent=2, ensure_ascii=False)

# JSON 데이터를 파일로 저장
with open("output.json", "w", encoding='utf-8') as json_file:
    json_file.write(json_data)

print("데이터가 JSON 파일로 저장되었습니다.")