FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false

COPY . .
RUN npm run build
RUN npm prune --production

CMD ["node", "dist/index.js"]
