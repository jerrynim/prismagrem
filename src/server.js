import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, ".env") });
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import logger from "morgan";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import graphqlHTTP from "express-graphql";
import { apolloUploadExpress } from "apollo-upload-server";
import cors from "cors";
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});
server.express.use(cors());
server.express.use(authenticateJwt);
server.express.use(logger("dev"));
server.express.use(
  "/graphql",
  apolloUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({ schema })
);

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
