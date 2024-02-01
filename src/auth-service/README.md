# Setup ("development"-Mode)

1. change node version: "nvm use 16.17.0"
2. install packages: "npm install"
3. copy ".env.example" and rename it to ".env"

4. go into: "./src/database"
5. run: "npx prisma migrate dev"
6. run: "npx prisma generate"

7. run auth server: "npm run start"
