import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRoom: async (_, args, request) => {
      const { user } = request;
      const { id } = args;
      const canSee = await prisma.$exists.room({
        participants_some: {
          id: user.id
        }
      });
      if (canSee) {
        return prisma.room({ id });
      } else {
        throw Error("You can't see this");
      }
    }
  }
};
