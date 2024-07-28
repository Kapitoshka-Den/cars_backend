FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 3001

RUN npm run build

CMD ["npm", "run", "start"]