import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import typeDefs from "./graphql/typeDefs/typeDefs.js";
import resolvers from "./graphql/resolvers/resolvers.js";
import { getUserFromToken } from "./utils/auth.js";
import dotenv from "dotenv";
 const prisma = new PrismaClient();
dotenv.config();
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
     
      const token = req.headers.authorization || "";
      const user = await getUserFromToken(token);
      return  {prisma,user} ; 
    },
  });
const PORT = process.env.PORT || 4000;
  await server.start();

  const app = express();
  app.use(cors());

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();