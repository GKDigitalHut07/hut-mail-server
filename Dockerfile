FROM eclipse-temurin:17-jre-alpine
EXPOSE 10000
ADD target/hut-email-service.jar hut-email-service.jar
ENTRYPOINT ["java","-jar","/hut-email-service.jar"]
