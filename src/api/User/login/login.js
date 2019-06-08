import bcrypt from "bcryptjs";
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
        const result = bcrypt.compareSync(secret, user.secret);
        if (result) {
          return generateToken(user.id);
        } else {
          throw Error("wrong password");
        }
      }
    }
  }
};
