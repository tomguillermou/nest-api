FROM node:14 as build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:14 as production
WORKDIR /app
COPY package.json ./
RUN yarn install --production
COPY --from=build /app/dist ./dist
CMD ["yarn", "start"]