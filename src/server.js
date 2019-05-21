import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, ".env") });
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import logger from "morgan";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { graphqlExpress } from "graphql-server-express";
import cors from "cors";
import bodyParser from "body-parser";
import { apolloUploadExpress } from "apollo-upload-server";
import upload from "./upload";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.express.use(cors(corsOptions));
server.express.use(authenticateJwt);
server.express.use(logger("dev"));
server.express.use(
  "/graphql",
  bodyParser.json(),
  apolloUploadExpress({ uploadDir: "./" }),
  graphqlExpress({ schema })
);
server.express.post("/upload", upload);

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
