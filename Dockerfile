FROM digitallyseamless/node-yarn:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Get the entrypoint script to connect containers
COPY ./docker-entrypoint.sh /
RUN chmod u+x /docker-entrypoint.sh

# label
LABEL author="Edouard Topin"

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

COPY bower.json /usr/src/app/

RUN yarn

# Bundle app source
COPY . /usr/src/app

EXPOSE 80

CMD [ "grunt", "serve" ]
