FROM --platform=linux/amd64 node:21-slim

ENV NODE_ENV development

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]