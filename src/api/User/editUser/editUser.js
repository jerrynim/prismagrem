import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, args, request) => {
      const { username, bio, email, gender, lastName, phoneNumber } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, bio, email, gender, lastName, phoneNumber }
      });
    }
  }
};
