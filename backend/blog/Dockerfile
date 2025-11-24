# 1. JDK 21 이미지 사용
FROM eclipse-temurin:21-jdk

# 2. 작업 디렉토리
WORKDIR /app

# 3. 빌드된 jar 파일 복사 (Gradle 기준)
COPY build/libs/*.jar app.jar

# 4. 포트 노출
EXPOSE 8080

# 5. 실행
ENTRYPOINT ["java","-jar","app.jar"]
