# Uses the node base image with the latest LTS version
FROM node:16-alpine3.11

ENV NODE_VERSION 16.0.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Compiles the typescript code down to javascript
RUN npm run tsc

EXPOSE 9090

# Command container will actually run when called
CMD ["npm", "start"]