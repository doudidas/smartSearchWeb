###################################################
# STEP 1 build website 
###################################################
FROM library/node:latest as builder

# Create app directory
RUN mkdir -p /ng-app
WORKDIR /ng-app

# Source Code
COPY src/ src/
# Modules dependancies
COPY yarn.lock yarn.lock
# Package managment configuration
COPY package.json package.json
# TypeScript configuration
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.json tsconfig.json
# Node app configuration
COPY angular.json angular.json

# Install dependancies
RUN yarn install

# Build application
RUN yarn build_prod

###################################################
# STEP 2 Setup nginx container with minimal code
###################################################

FROM nginx:alpine

## Replace default configuration 
COPY nginx/default.conf etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/index.html

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/smartSearchWeb/ /usr/share/nginx/html

# label
LABEL author="Edouard Topin"
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
