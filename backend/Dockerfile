FROM node:bookworm

WORKDIR /app
COPY . .

RUN npm install

ENTRYPOINT ["node", "index.js"]

EXPOSE 3004