const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
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
});

module.exports = [permissions];
