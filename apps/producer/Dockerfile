FROM openjdk:17-alpine
COPY build/libs/producer-0.0.1-SNAPSHOT.jar /app/producer.jar
ENTRYPOINT ["java"]
CMD ["-jar", "/app/producer.jar"]
EXPOSE 8080