import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import typeDefs from "./graphql/typeDefs/typeDefs.js";
import resolvers from "./graphql/resolvers/resolvers.js";
import { getUserFromToken } from "./utils/auth.js";

 const prisma = new PrismaClient();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const user = await getUserFromToken(token);
   //   console.log(user)
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