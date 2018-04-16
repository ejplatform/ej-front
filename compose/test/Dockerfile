# This image is intended for testing purposes only
FROM node@sha256:2a7b126df217ca63d944637cbf457f68f68ef344f3c8c26405946f406a349eb3
# TODO: Restore to node:8 after manifest error be solved

COPY . /app

WORKDIR /app

RUN npm install

CMD ["./node_modules/.bin/ng", "test", "--code-coverage", "--single-run"]
