###
FROM node:alpine AS build
WORKDIR /app
COPY . /app
RUN npm install && npm run build

###
FROM nginx:1.19
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/grocery /usr/share/nginx/html