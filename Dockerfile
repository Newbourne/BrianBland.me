# Image Version

FROM ubuntu:latest

# Install node

RUN apt-get install -y build-essential
RUN curl -sL https://deb.nodesource.com/setup_5.x | -E bash - apt-get install -y nodejs

# Bundle app source

#RUN mkdir app
#COPY . /app
#WORKDIR /app

#RUN npm install -g gulp
#RUN npm install -g babel

# Install app dependencies

#RUN npm install

# RUN npm run build

# RUN cp data/Raegan.png dist/

# Run Commands

#CMD ["npm", "run", "prod"]
EXPOSE 8080

# Useful Commands

# Build
# docker build -t bland/brian-bland-me-node .

# Run
# docker run -d -p 80:8080 -t bland/brian-bland-me-node

# To view iptables mapping
# iptables -t nat -L -n

# Delete all containers
# docker rm $(docker ps -a -q)

# Delete all images
# docker rmi $(docker images -q)
