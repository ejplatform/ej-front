# This image is intended for build purposes
# It will not serve content in production by itself
# Use nginx for that
FROM node:8

# npm install (in separate dir due to docker cache)
ADD package.json /tmp/npm_inst/package.json
RUN cd /tmp/npm_inst &&\
    npm install &&\
    mkdir -p /app &&\
    mv /tmp/npm_inst/node_modules /app/

# build application
WORKDIR /app
ADD . /app

RUN $(npm bin)/ng build --prod --build-optimizer --environment=prod
