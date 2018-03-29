# This image is intended for development purposes only
FROM node:8

COPY ./compose/local/angular/start.sh /start.sh

COPY . /app

WORKDIR /app

RUN npm install

CMD ["/start.sh"]
