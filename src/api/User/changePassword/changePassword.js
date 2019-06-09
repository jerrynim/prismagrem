import bcrypt from "bcrypt";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    changePassword: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { currentPs, newPs } = args;
      const promiseSecret = new Promise((resolve, reject) => {
        const secretCheck = bcrypt.compare(currentPs, user.secret);
        resolve(secretCheck);
      });
      const result = promiseSecret.then((secretCheck) => {
        if (secretCheck) {
          //비밀먼호 일치
          const promiseNewSecret = new Promise((resolve, reject) => {
            //newPs로 새로운 비밀번호 hash
            const hashedSecret = bcrypt.hash(
              newPs,
              parseInt(process.env.BYCRIPT_ROUNDS)
            );
            resolve(hashedSecret);
          });
          promiseNewSecret.then(async (secret) => {
            await prisma.updateUser({
              where: { id: user.id },
              data: {
                secret
              }
            });
          });

          return secretCheck;
        } else {
          //비밀번호 불일치시
          return secretCheck;
        }
      });
      return result;
    }
  }
};
