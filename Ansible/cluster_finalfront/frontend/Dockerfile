FROM ubuntu:20.04
FROM node:18

RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN npm install

EXPOSE 3000/tcp
CMD npm start
