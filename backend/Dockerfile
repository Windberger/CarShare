FROM openjdk:17-jdk-slim
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

EXPOSE 8080
RUN ls -la target
CMD sh -c 'java -jar target/*.jar'