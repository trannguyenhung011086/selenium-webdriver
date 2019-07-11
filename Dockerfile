FROM node:alpine

RUN apk add ca-certificates chromium

WORKDIR /tester

COPY . /tester

ENV NODE_PATH=/tester/node_modules
ENV PATH=$PATH:/tester/node_modules/.bin

RUN npm install && npm cache verify

# CMD [ "/bin/sh", "docker-entry.sh" ]