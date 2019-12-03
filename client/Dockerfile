FROM node:10.16.0-alpine as build
WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx
COPY --from=build /app/dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
