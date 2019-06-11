const serverless = require("serverless-http");
const koa = require("koa"); // or any supported framework
const cors = require("cors");
const bodyParser = require("body-parser");
const upload = require("./upload");
const Router = require("koa-router");

const app = new koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "홈";
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports.handler = serverless(app);

// or as a promise
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  // you can do other things here
  const result = await handler(event, context);
  // and here
  return result;
};
