import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getPosts: async () => {
      try {
        const posts = await prisma.posts({ first: 12 });
        return posts;
      } catch (e) {
        throw Error("couldn't getPosts");
      }
    }
  }
};
