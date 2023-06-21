##dev
#FROM node:18.16-alpine
#WORKDIR /app
#COPY package.json .
#RUN npm install
#COPY . .
#EXPOSE 3000
#CMD ["npm", "start"]

#prod
FROM node:18.16-alpine as prod-built
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=prod-built /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

