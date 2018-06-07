FROM library/node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# label
LABEL author="Edouard Topin"

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app/

EXPOSE 4200

CMD [ "yarn", "start"]
