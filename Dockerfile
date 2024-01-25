FROM node:18-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm install -g esbuild-wasm
RUN npm config set fetch-retry-maxtimeout 600000 -g
RUN npm cache clean --force
RUN npm cache clean --force --cache /opt/.npm
RUN npm ci --legacy-peer-deps

WORKDIR /opt/app
COPY . .


EXPOSE 1337
CMD ["npm", "run", "develop"]
