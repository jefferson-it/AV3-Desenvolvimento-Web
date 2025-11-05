FROM node:22-alpine

WORKDIR /app
COPY ./package.json .

RUN npm install --save

RUN apk add --no-cache mongodb-tools

COPY . .

ENV SECRET=app-app-app
ENV SESSION_SECRET=senha-super-secreta-talvez-no

CMD [ "npm", "run", "start" ]