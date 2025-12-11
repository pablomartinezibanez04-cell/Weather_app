FROM node

WORKDIR /app/backend

COPY package*.json ./

RUN npm install
RUN npm i -g nodemon

EXPOSE 3000

CMD ["npm", "run", "dev"]