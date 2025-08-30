FROM node:22-alpine

WORKDIR /app
COPY ./package.json .

RUN npm install --save

COPY . .

CMD [ "npm", "run", "start" ]