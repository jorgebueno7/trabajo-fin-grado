# FROM node:20-alpine3.20

# RUN mkdir /app

# WORKDIR /app

# COPY package.json .

# RUN npm i

# ADD . /app/

# EXPOSE 5173

# CMD ["npm", "run", "dev"]

FROM node:20-alpine3.20

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
