const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  console.log(ctx);
  return Boolean(ctx.userId);
});

const permissions = shield({
  Query: { me: isAuthenticated }
});

module.exports = [permissions];
