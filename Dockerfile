# Image Version

FROM node:0.12.7-wheezy
MAINTAINER Brian Bland <brian.bland@live.com>

# Bundle app source

COPY . /src

RUN npm install -g gulp
RUN npm install -g babel

# Install app dependencies

RUN cd /src; npm install

# Doesn't appear to work correctly
RUN cd /src; npm run build

# Run Commands

CMD ["npm", "run", "start"]
EXPOSE 8080


# Useful Commands

# Run
# sudo docker run -d -p 80:8080

# To view iptables mapping
# sudo iptables -t nat -L -n