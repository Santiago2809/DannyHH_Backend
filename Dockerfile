FROM node:18
WORKDIR /src
COPY /src /src
RUN npm install
CMD [ "npm", "start" ]