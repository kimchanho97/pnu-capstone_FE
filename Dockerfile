# 1. Node.js 이미지 사용
FROM node:14 as build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package*.json ./

# 4. 패키지 설치
RUN npm install

# 5. 애플리케이션 소스 코드 복사
COPY . .

ENV REACT_APP_API_URL=https://backend.pitapat.ne.kr
ENV REACT_APP_GITHUB_CLIENT_ID=Ov23liKMC4bcDxSdpNS2 

# 6. React 애플리케이션 빌드
RUN npm run build

# 7. Nginx 사용하여 빌드된 파일을 서빙
FROM nginx:1.19.0

# 8. 빌드된 파일 복사
COPY --from=build /app/build /usr/share/nginx/html

# 9. Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 10. Nginx 포트 노출
EXPOSE 80

# 11. Nginx 실행
CMD ["nginx", "-g", "daemon off;"]

