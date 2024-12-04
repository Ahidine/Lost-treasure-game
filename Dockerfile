FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npx", "ts-node", "--require", "tsconfig-paths/register", "src/index.ts"]
