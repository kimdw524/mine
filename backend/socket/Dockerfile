# 1. 빌드 단계
FROM gradle:8.9.0-jdk21 AS builder
WORKDIR /socket
COPY . .

RUN chmod +x ./gradlew
RUN ./gradlew bootJar

# 2. 패키지 단계
FROM amazoncorretto:21
COPY --from=builder /socket/build/libs/*.jar /socket.jar

EXPOSE 8080

CMD ["java", "-jar", "/socket.jar"]
