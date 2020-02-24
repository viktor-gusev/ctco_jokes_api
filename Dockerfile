FROM node:12 AS packager

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY src/ .

RUN npm install
RUN npm run build

FROM node:12

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app

COPY --from=packager /usr/src/app/package*.json ./
COPY --from=packager /usr/src/app/dist/ ./dist/

RUN npm install --production

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]