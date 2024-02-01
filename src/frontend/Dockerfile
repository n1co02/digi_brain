# Author: Nico Mangold + Erik Priemer
FROM node:17-alpine

# specify workdirectory o be inside subfolder called app
WORKDIR /app

# copy package.json to roots of workdir(.) -> /app
COPY package.json .

# install dependencies
RUN npm install

# copy current dir (.) to root workdir /app (.)
COPY . .

RUN npm run gql-codegen:start

EXPOSE 3000
# required for docker desktop port mapping

CMD ["npm", "start"]