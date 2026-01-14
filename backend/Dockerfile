FROM eclipse-temurin:21-jdk AS build
WORKDIR /build

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy and build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]