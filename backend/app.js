const express = require("express");
const {ApolloServer} = require('apollo-server-express')
const bodyParser = require("body-parser");
const cors = require("cors");
const  { PrismaClient } =require ('@prisma/client');
 
 const typeDefs = require('./graphql/typeDefs/typeDefs.js')
 const resolvers = require('./graphql/resolvers/resolvers.js')

 const {getUserFromToken} = require('./utils/auth.js')
 
 const prisma = new PrismaClient();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      const user = getUserFromToken(token);
      console.log(user)
      return  {prisma,user} ; 
    },
  });

  await server.start();

  const app = express();
  app.use(cors());

  // Use applyMiddleware for Apollo Server v3
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();