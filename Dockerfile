FROM node
MAINTAINER Dan Harper <dan@kingdomsolutions.com.au>
WORKDIR /app
ADD ./package.json /app/package.json

RUN npm install jspec -g
RUN npm install

ADD . /app/
