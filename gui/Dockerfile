#Dockerfile for building Smart Banking App production image

FROM node:10.23 as builder

LABEL maintainer="Marko Perajica"
LABEL version="1.0"

RUN mkdir /opt/sba

WORKDIR "/opt/sba"

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./yarn.lock ./

RUN yarn upgrade
RUN yarn install

COPY ./ ./

RUN yarn build

FROM nginx:latest
EXPOSE 3000
COPY ./nginx/sba.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/sba/build /usr/share/nginx/html
