# This image is intended for production purposes only
# The main purpose of this image is to generate
FROM node@sha256:2a7b126df217ca63d944637cbf457f68f68ef344f3c8c26405946f406a349eb3
# TODO: Restore to node:8 after manifest error be solved

COPY ./compose/production/angular/build.sh /build.sh

CMD ["/build.sh", "prod", "dist/ej", "/"]
