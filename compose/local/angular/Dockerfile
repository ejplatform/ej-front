# This image is intended for development purposes only
FROM node:7

RUN npm install -g @angular/cli@1.4

ADD ./compose/local/angular/start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /app
WORKDIR /app

CMD /start.sh