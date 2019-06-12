import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env") });
import { GraphQLServerLambda } from "graphql-yoga";
import express from "express";
import path from "path";
import serverless from "serverless-http";
import cors from "cors";
import bodyParser from "body-parser";
import upload from "./upload";

const app = express();
app.use(cors());
app.use(bodyParser());
app.get("/image", function(req, res) {
  res.send("Hello World!");
});
app.post("/upload", upload);

module.exports.handler = serverless(app);
