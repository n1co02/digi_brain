#Author Nicolas Ostermann
FROM node:17-alpine

# specify workdirectory o be inside subfolder called app
WORKDIR /gateway

# copy package.json to roots of workdir(.) -> /app
COPY package.json .

# install dependencies
RUN npm install

# copy current dir (.) to root workdir /app (.)
COPY . .

RUN npm run gql-codegen:start

EXPOSE 4041
# required for docker desktop port mapping

CMD ["npm", "start"]