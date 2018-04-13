# This image is intended for production purposes only
# Must build ./compose/production/angular/Dockerfile before building this!
FROM nginx

COPY ./dist/ej/ /usr/share/nginx/html/

COPY ./compose/production/nginx/default.conf /etc/nginx/conf.d/default.conf
