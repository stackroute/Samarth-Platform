FROM mhart/alpine-node
 
RUN apk add --update git

# Create app directory
RUN mkdir -p /usr/src/app && echo "Samarth Platform"

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

EXPOSE 8081

WORKDIR /usr/src/app

CMD ["npm", "start"]

