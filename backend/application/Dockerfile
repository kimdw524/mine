# 1. 빌드 단계
FROM gradle:8.9.0-jdk21 AS builder
WORKDIR /application
COPY . .

RUN chmod 755 gradlew
RUN ./gradlew bootJar

# 2. 패키지 단계
FROM amazoncorretto:21
COPY --from=builder /application/build/libs/*.jar /app.jar

EXPOSE 8080

CMD ["java", "-jar", "/app.jar"]
