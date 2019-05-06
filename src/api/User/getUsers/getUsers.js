import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getUsers: async () => {
      try {
        const users = await prisma.users({ first: 10 });
        return users;
      } catch (e) {
        throw Error("couldn't getUsers");
      }
    }
  }
};
