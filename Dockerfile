FROM library/node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# label
LABEL author="Edouard Topin"

# Install app dependencies

COPY package.json /usr/src/app/

RUN yarn install

# Bundle app source
COPY node_module /usr/src/app/
COPY src /usr/src/app/
EXPOSE 4200

CMD [ "yarn", "start_ssl_container"]
