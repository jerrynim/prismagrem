import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

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
      } else {
        bcrypt.genSalt(parseInt(process.env.BYCRIPT_ROUNDS), function(
          err,
          salt
        ) {
          bcrypt.hash(secret, salt, async (err, hash) => {
            // Store hash in your password DB.
            await prisma.createUser({
              username,
              email,
              lastName: name,
              secret: hash
            });
          });
        });
        return true;
      }
    }
  }
};
