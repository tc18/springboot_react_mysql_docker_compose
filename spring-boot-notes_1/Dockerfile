FROM maven:latest
WORKDIR /spring-boot-notes
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run