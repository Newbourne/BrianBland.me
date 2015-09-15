# Image Version

FROM node:0.12.7-wheezy
MAINTAINER Brian Bland <brian.bland@live.com>

# Bundle app source

COPY . /src
WORKDIR /src

RUN cp data/Raegan.png dist/

RUN npm install -g gulp
RUN npm install -g babel

# Install app dependencies

RUN npm install

# Doesn't appear to work correctly

RUN npm run build

# Run Commands

CMD ["npm", "run", "start"]
EXPOSE 8080

# Useful Commands

# Run
# sudo docker run -d -p 80:8080
# docker run -t bland/brian-bland-me-node -p 80:8080

# To view iptables mapping
# sudo iptables -t nat -L -n

# Delete all containers
#docker rm $(docker ps -a -q)
# Delete all images
#docker rmi $(docker images -q)