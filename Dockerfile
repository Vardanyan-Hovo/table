FROM node:18.14.0-alpine

WORKDIR /persons

COPY package*.json .

RUN npm install

COPY . .

RUN rm node_modules/react-scripts/config/webpackDevServer.config.js

RUN cp public/webpackDevServer.config.js node_modules/react-scripts/config/webpackDevServer.config.js


EXPOSE 3000

CMD ["npm",  "start"]
