#Author Nicolas Ostermann
FROM node:17-alpine

# specify workdirectory o be inside subfolder called app
WORKDIR /auth-service

# copy package.json to roots of workdir(.) -> /app
COPY package.json .

# install dependencies
RUN npm install

# copy current dir (.) to root workdir /app (.)
COPY . .

WORKDIR /auth-service/src/database
RUN npx prisma migrate dev
RUN npx prisma generate

EXPOSE 4042
# required for docker desktop port mapping

CMD ["npm", "start"]