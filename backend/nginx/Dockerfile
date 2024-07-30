FROM nginx:stable-alpine

WORKDIR /nginx/

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN cat /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]