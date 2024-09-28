## Use an official OpenJDK runtime as the base image
#FROM openjdk:17-jdk-alpine
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy the packaged Spring Boot application (JAR file) from the target folder into the container
#ARG JAR_FILE=target/ShopiShop-0.0.1-SNAPSHOT.jar
#COPY ${JAR_FILE} app.jar
#
## Expose the port that Spring Boot runs on (8080 by default)
#EXPOSE 8080
#
## Define the command to run your Spring Boot application
#ENTRYPOINT ["java","-jar","/app/app.jar"]
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
