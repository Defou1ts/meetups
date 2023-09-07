FROM node:18.120-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

COPY ./dist ./dist

CMD ["yarn", "start:dev"]