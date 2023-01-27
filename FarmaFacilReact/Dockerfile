FROM node:14.21.1

WORKDIR /usr/app

COPY package.json ./
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]