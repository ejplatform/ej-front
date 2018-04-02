# This image is intended for development purposes only
FROM node:8

ENV NPM_CONFIG_LOGLEVEL info

ADD ./compose/local/angular/start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /app
WORKDIR /app

CMD /start.sh
