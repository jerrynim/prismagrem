import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env") });
import { GraphQLServerLambda } from "graphql-yoga";
import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import serverless from "serverless-http";
import middlewares from "./middlewares";
import { prisma } from "../generated/prisma-client";
import cors from "cors";
import bodyParser from "body-parser";
import schema from "./schema";
import upload from "./upload";
const lambda = new GraphQLServerLambda({
  schema,
  middlewares: middlewares,
  context: async (request) => {
    //프리스마 에서 유저를 찾아 request 넣는다
    const token = request.event.headers.Authorization;
    if (token === undefined || token === "null") {
      return { ...request };
    } else {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user({ id });
      return { ...request, user };
    }
  }
});

const app = express();
app.use(cors());
app.use(bodyParser());
app.post("/upload", upload);

module.exports.handler = serverless(app);
export const server = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;
