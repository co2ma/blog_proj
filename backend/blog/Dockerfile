# 1. Gradle 빌드용 이미지
FROM gradle:8.10-jdk21 AS builder
WORKDIR /app

# Gradle 빌드에 필요한 파일들 복사
COPY build.gradle settings.gradle ./
COPY src ./src

# 실제 빌드
RUN gradle clean build -x test

# 2. 런타임 이미지
FROM eclipse-temurin:21-jdk
WORKDIR /app

# 빌드 결과 복사
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
