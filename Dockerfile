# Image Version
# Uses custom nvm-base image
# ubuntu:latest + nvm + node 5.5.0 alias default
FROM bland/nvm-base

# nvm-base 
# RUN apt-get update
# RUN apt-get install -y build-essential curl
# RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
# RUN . ~/.nvm/nvm.sh 
# RUN nvm install 5.5.0
# RUN nvm alias default 5.5.0

# Bundle app source

RUN mkdir app
COPY . /app
WORKDIR /app

RUN npm install -g gulp
RUN npm install -g babel

# Install app dependencies

RUN npm install

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
