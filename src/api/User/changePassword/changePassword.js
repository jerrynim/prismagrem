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
          const promisePrevSecret = new Promise((resolve, reject) => {
            //이전비밀번호와 일치하는지 확인
            const secretCheck = bcrypt.compare(newPs, user.secret);
            resolve(secretCheck);
          });
          const result = promisePrevSecret.then(async (result) => {
            if (await result) {
              //이전비밀번호와 일치한다면
              return "이전 비밀번호와 일치합니다.";
            } else {
              //이전 비밀번호와 불일치한다면
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
              return "비밀번호가 변경되었습니다.";
            }
          });
          return result;
        } else {
          //비밀번호 불일치시
          return "이전 비밀번호가 다릅니다";
        }
      });
      return result;
    }
  }
};
