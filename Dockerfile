# Run
# sudo docker run -d -p 80:8080

# Image Version
#FROM ubuntu:14.04
#FROM node:0.12.4-onbuild
FROM centos:centos6
MAINTAINER Brian Bland <brian.bland@live.com>

# Enable EPEL for Node.js
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

# Install Node.js and npm
RUN yum install -y npm

# Bundle app source
COPY . /src

RUN npm install -g gulp
RUN npm install -g babel

# Install app dependencies
RUN cd /src; npm install

RUN npm run build

CMD ["npm", "run", "start"]
EXPOSE 8080

# Useful Commands

# To view iptables mapping
# sudo iptables -t nat -L -n