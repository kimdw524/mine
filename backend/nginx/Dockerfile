FROM nginx:stable-alpine

WORKDIR /nginx/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN cat /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]