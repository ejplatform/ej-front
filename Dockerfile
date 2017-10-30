FROM node as builder
COPY . /app
WORKDIR /app
RUN yarn install
RUN ./node_modules/.bin/ng build            \
        --prod                              \
        --output-path dist/empurrandojuntos \
        --deploy-url

FROM nginx
COPY --from=builder /app/dist/empurrandojuntos/. /usr/share/nginx/html/

