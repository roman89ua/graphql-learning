import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { resolvers } from "./resolvers.js";
import { getUser } from "./db/users.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);
const typeDefs = await readFile("./schema.graphql", "utf-8");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

async function getContext({ req }) {
  if (req.auth) {
    const user = await getUser(req.auth.sub);

    return { user };
  }

  return {};
}

await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Graphql endpoint running on port: http://localhost:${PORT}/graphql`,
  );
});
