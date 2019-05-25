import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getPosts: async () => {
      return prisma.posts({ first: 10 });
    }
  }
};
