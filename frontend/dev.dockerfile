FROM --platform=linux/amd64/v2 node:21-slim

ENV NODE_ENV development

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 8080

CMD ["pnpm", "run", "dev", "--host"]