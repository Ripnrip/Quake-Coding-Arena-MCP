FROM node:20-alpine AS base
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY public ./public
COPY server ./server
COPY .env.example ./

ENV NODE_ENV=production
ENV PORT=4173
EXPOSE 4173

CMD ["node", "server/index.js"]
