FROM node:10.16.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#RUN npm install -g @angular/cli
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 4200
CMD ["npm","start"]
