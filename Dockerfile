# Image Version

FROM node:0.12.7-wheezy
MAINTAINER Brian Bland <brian.bland@live.com>

# Bundle app source

COPY . /src
WORKDIR /src

RUN npm install -g gulp
RUN npm install -g babel

# Install app dependencies

RUN npm install

RUN npm run build

RUN cp data/Raegan.png dist/

# Run Commands

CMD ["npm", "run", "start"]
EXPOSE 8080

# Useful Commands

# Build
# docker build -t bland/brian-bland-me-node .

# Run
# docker run -d -p 80:8080 -t bland/brian-bland-me-node

# To view iptables mapping
# sudo iptables -t nat -L -n

# Delete all containers
# docker rm $(docker ps -a -q)

# Delete all images
# docker rmi $(docker images -q)