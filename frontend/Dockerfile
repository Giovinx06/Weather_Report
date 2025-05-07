FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# serve
FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html