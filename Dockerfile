FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . /usr/src/app
EXPOSE 5000
CMD ["npm","start"]