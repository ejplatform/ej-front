FROM node:7.2.1 as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN ./node_modules/.bin/ng build            \
        --prod                              \
        --output-path dist/empurrandojuntos \
        --deploy-url

FROM nginx
COPY --from=builder /app/dist/empurrandojuntos/. /usr/share/nginx/html/

