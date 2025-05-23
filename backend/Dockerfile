FROM node:20

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json || true

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]
