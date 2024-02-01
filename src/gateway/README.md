# Setup ("development"-Mode)

1. change node version: "nvm use 16.17.0"
2. install packages: "npm install"
3. copy ".env.example" and rename it to ".env"

4. run: "npm run gql-codegen:start"

5. run gateway server: "npm run start"

# How to test the Subscription in graphql - apollo-sandbox

1. go to http://localhost:4041/graphql
2. add the subscription-operation (it should say "listening..." on the right side)
3. trigger it by changing the room using graphql mutations

## How to test the Subscription in graphql - altair

1. Set Subscription Endpoint to: ws://localhost:4041/graphql
2. Set Subscription type to graphql-ws
3. Start the subscription
4. trigger it by changing the room using graphql mutations
