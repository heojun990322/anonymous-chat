FROM node:18.16.0

LABEL author="heojun990322"

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]
