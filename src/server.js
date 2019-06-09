import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env") });
import { GraphQLServerLambda } from "graphql-yoga";
import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import serverless from "serverless-http";
import { fileLoader, mergeResolvers } from "merge-graphql-schemas";
import middlewares from "./middlewares";
import { prisma } from "../generated/prisma-client";
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const lambda = new GraphQLServerLambda({
  typeDefs: "./src/schema.graphql",
  resolvers: mergeResolvers(allResolvers),
  middlewares: middlewares,
<<<<<<< HEAD
  context: async (req) => {
    const token = req.event.headers;
    if (token) {
      if (token) {
        //프리스마 에서 유저를 찾아 req에 넣는다
        try {
          console.log(token, process.env.JWT_SECRET);
          // const id = jwt.verify(token, process.env.JWT_SECRET || "");
          // console.log(id);
        } catch (e) {
          console.log(e.message);
        }
        return { ...req, user };
      } else {
        return { ...req };
      }
=======
  context: async (request) => {
    //프리스마 에서 유저를 찾아 request 넣는다
    try {
      const token = request.event.headers;
      if (token) {
        const { id } = jwt.verify(token.Authorization, process.env.JWT_SECRET);
        const user = await prisma.user({ id });
        return { ...request, user };
      } else {
        return { ...request };
      }
    } catch (e) {
      throw Error(e.message);
>>>>>>> parent of 6802d2b... deployed serverless
    }
  }
});

const app = express();

app.get("/image", function(req, res) {
  res.send("Hello World!");
});

module.exports.handler = serverless(app);
export const server = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;
