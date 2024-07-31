#build stage
FROM node:18 as build-stage
WORKDIR /src
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

#production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /src/build /usr/share/nginx/html

#nginx conf
COPY nginx.conf /etc/nginx/nginx.conf

#expose
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]