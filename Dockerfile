# Image Version
FROM bland/node-base

RUN mkdir app
COPY . /app
WORKDIR /app

RUN npm install

CMD ["npm", "run", "prod"]

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