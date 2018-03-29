# This image is intended for production purposes only
# The main purpose of this image is to generate
FROM node:8

COPY ./compose/production/angular/build.sh /build.sh

CMD ["/build.sh", "prod", "dist/ej", "/"]
