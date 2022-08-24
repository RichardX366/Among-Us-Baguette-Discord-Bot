FROM node:18
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN tsc
CMD ["yarn", "start"]