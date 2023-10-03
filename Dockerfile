FROM node:18
WORKDIR /build
COPY /build /build
RUN npm install
CMD [ "npm", "start" ]
EXPOSE 3000