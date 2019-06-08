import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    facebookLogin: async (_, args) => {
      const { email, firstName, lastName, name } = args;
      const existUser = await prisma.user({ email });
      if (existUser) {
        //로그인 토큰을발행
        const token = generateToken(existUser.id);
        return token;
      } else {
        //user create
        const newUser = await prisma.createUser({
          email,
          firstName,
          lastName,
          username: name
        });
        const token = generateToken(newUser.id);
        return token;
      }
    }
  }
};
