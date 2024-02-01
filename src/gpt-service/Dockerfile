#Author Nicolas Ostermann
FROM node:17-alpine

# specify workdirectory o be inside subfolder called app
WORKDIR /gpt-service

# copy package.json to roots of workdir(.) -> /app
COPY package.json .

# install dependencies
RUN npm install

# copy current dir (.) to root workdir /app (.)
COPY . .

EXPOSE 4044
# required for docker desktop port mapping

CMD ["npm", "start"]