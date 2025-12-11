FROM node

WORKDIR /frontend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["nodemon", "--legacy-watch", "index.js"]