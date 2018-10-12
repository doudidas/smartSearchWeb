### STAGE 2: Build ###

FROM library/node:10-alpine as builder

# Create app directory
RUN mkdir -p /ng-app
WORKDIR /ng-app

# Install all
COPY . .
RUN npm install --global yarn @angular/cli && yarn install && ng build --prod

### STAGE 2: Setup ###

FROM nginx:alpine

## Replace default configuration 
COPY nginx/default.conf etc/nginx/conf.d/
ADD .certificate/* /etc/ssl/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

# label
LABEL author="Edouard Topin"
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
