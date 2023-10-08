FROM node:18-alpine

WORKDIR /code

RUN npm install -g json-server

COPY . .

CMD ["json-server","--watch","./db.json","--port","3050"]