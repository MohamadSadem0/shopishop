# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged Spring Boot application (JAR file) from the backend/target folder into the container
COPY target/*.jar /app/app.jar

# Expose the port that Spring Boot runs on (8080 by default)
EXPOSE 8080

# Define the command to run your Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
