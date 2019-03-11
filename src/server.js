import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, ".env") });

import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import logger from "morgan";
import { sendSecretMail } from "./utils";

sendSecretMail("tjerry3@naver.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
