FROM node:20-alpine3.20

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm i

ADD . /app/

EXPOSE 3000

CMD ["npm", "start"]