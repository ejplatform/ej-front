# This image is intended for testing purposes only
FROM node:8

COPY . /app

WORKDIR /app

RUN npm install

CMD ["./node_modules/.bin/ng", "test", "--code-coverage", "--single-run"]
