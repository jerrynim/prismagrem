import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { email, name, username, secret } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username
          },
          { email }
        ]
      });
      if (exists) {
        throw Error("This username / email is already taken");
      }
      await prisma.createUser({
        username,
        email,
        lastName: name,
        secret
      });
      return true;
    }
  }
};
