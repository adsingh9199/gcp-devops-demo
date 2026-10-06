FROM node:22-alpine

WORKDIR /app

COPY ./node-sample-api/package*.json ./

RUN npm install --omit=dev

COPY ./node-sample-api/server.js .

ENV PORT=8080
ENV APP_VERSION=4.0.0
ENV ENVIRONMENT=development

EXPOSE 8080

CMD ["node", "server.js"]
