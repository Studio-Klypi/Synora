FROM node:22

WORKDIR /app

COPY . .

RUN yarn install

RUN npx prisma generate

RUN npx prisma migrate deploy

CMD yarn build && node .output/server/index.mjs
