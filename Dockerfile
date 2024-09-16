# Stage 0, "build-stage", based on Node.js to build the frontend
FROM node:14-alpine as build
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install
COPY . /app/

RUN yarn build

FROM nginx:1.22.0-alpine
COPY --from=build /app/build /usr/share/nginx/html

WORKDIR /usr/share/nginx
COPY ./env.sh .
COPY ./.env.example ./.env

# Make our shell script executable
RUN chmod +x ./env.sh

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["/bin/sh", "-c", "/usr/share/nginx/env.sh && nginx -g \"daemon off;\""]
