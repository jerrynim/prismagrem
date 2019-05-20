import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { username } = args;
      const data = await prisma.user({ username });
      console.log(data);
      return data;
    }
  }
};
