# This image is intended for build purposes
# It will not serve content in production by itself
# Use nginx for that
FROM node:7

RUN npm install -g @angular/cli@1.4

# npm install (in separate dir due to docker cache)
ADD package.json /tmp/npm_inst/package.json
RUN cd /tmp/npm_inst &&\
    npm install &&\
    mkdir -p /app &&\
    mv /tmp/npm_inst/node_modules /app/

# build application
WORKDIR /app
ADD . /app
RUN cd /app &&\
    ng build --prod
