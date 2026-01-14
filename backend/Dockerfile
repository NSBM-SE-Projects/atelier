FROM maven:3.8.1-openjdk-21 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-slim
WORKDIR /app
COPY --from=build /build/target/atelier-1.0.0-RELEASE.jar app.jar
  EXPOSE 8080
  CMD ["java", "-jar", "app.jar"]