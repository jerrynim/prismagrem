import bcrypt from "bcrypt";
import { generateToken } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    login: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret !== "") {
        throw Error("not  Verified");
      } else {
        const secretCheck = bcrypt.compare(secret, user.secret);
        if (secretCheck) {
          return generateToken(user.id);
        } else {
          throw Error("password Wrong");
        }
      }
    }
  }
};
