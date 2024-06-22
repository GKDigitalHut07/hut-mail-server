FROM openjdk:17
EXPOSE 10000
ADD target/hut-email-service.jar hut-email-service.jar
ENTRYPOINT ["java","-jar","/hut-email-service.jar"]