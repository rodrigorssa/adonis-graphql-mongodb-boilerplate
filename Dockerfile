FROM node:14.16.0-alpine3.13
ENV PORT=3333

COPY . /app
WORKDIR /app

ENV TZ=America/Sao_Paulo

RUN npm cache clean --force && rm -rf ~/.npm && npm config set strict-ssl false && rm -rf node_modules/ && rm -f package-lock.json && npm install --only=production

EXPOSE $PORT

CMD ["node", "server.js"]