FROM node:18-alpine

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install 

COPY . .

RUN npm run build && npm install -g serve

CMD ["serve","-s","build"]