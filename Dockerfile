FROM digitallyseamless/nodejs-bower-grunt:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Name creator
MAINTAINER spaceLama

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

COPY bower.json /usr/src/app/

RUN bower install

# Bundle app source
COPY . /usr/src/app

EXPOSE 9000
CMD [ "grunt", "serve" ]
