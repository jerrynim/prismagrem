import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt";

const ROUNDS = 10;

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
      const hashedSecret = await bcrypt.hash(
        secret,
        parseInt(process.env.BYCRIPT_ROUNDS)
      );
      await prisma.createUser({
        username,
        email,
        lastName: name,
        secret: hashedSecret
      });
      return true;
    }
  }
};
