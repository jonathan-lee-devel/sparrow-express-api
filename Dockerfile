FROM --platform=linux/x86_64 node:18-alpine3.17

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "--es-module-specifier-resolution=node", "dist/main/bin/www.js" ]
