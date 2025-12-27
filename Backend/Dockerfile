FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV node_env=production
RUN npm run build
RUN npx prisma generate
RUN npx prisma db push

EXPOSE 3000

CMD ["npm", "run", "start"]
