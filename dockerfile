FROM node:18

RUN npm install -g ts-node-dev

WORKDIR /app

COPY package*.json /

COPY . .

RUN npm install

CMD [ "npm", "start" ]