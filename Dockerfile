FROM node:lts
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm ci
EXPOSE 8080
CMD ["npm", "start"]