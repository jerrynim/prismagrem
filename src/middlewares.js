const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
<<<<<<< HEAD
  console.log(ctx);
  return Boolean(ctx.userId);
});

const permissions = shield({
  Query: { me: isAuthenticated }
=======
  return Boolean(ctx.user);
});

const permissions = shield({
  Query: {
    me: isAuthenticated,
    seeFeed: isAuthenticated,
    seeRoom: isAuthenticated,
    seeRooms: isAuthenticated
  },
  Mutation: {
    changePassword: isAuthenticated,
    addComment: isAuthenticated,
    toggleLike: isAuthenticated,
    sendMessage: isAuthenticated,
    editPost: isAuthenticated,
    upload: isAuthenticated,
    editUser: isAuthenticated,
    follow: isAuthenticated,
    unfollow: isAuthenticated
  }
>>>>>>> parent of 6802d2b... deployed serverless
});

module.exports = [permissions];
