import bcrypt from "bcryptjs";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    changePassword: async (_, args, request) => {
      const { user } = request;
      const { currentPs, newPs } = args;
      const promiseSecret = new Promise((resolve, reject) => {
        const secretCheck = bcrypt.compareSync(currentPs, user.secret);
        resolve(secretCheck);
      });
      const result = promiseSecret.then((secretCheck) => {
        if (secretCheck) {
          //비밀먼호 일치
          const promisePrevSecret = new Promise((resolve, reject) => {
            //이전비밀번호와 일치하는지 확인
            const secretCheck = bcrypt.compareSync(newPs, user.secret);
            resolve(secretCheck);
          });
          const result = promisePrevSecret.then(async (result) => {
            if (await result) {
              //이전비밀번호와 일치한다면
              return "이전 비밀번호와 일치합니다.";
            } else {
              //이전 비밀번호와 불일치한다면
              bcrypt.genSalt(parseInt(process.env.BYCRIPT_ROUNDS), function(
                err,
                salt
              ) {
                bcrypt.hash(newPs, salt, async (err, hash) => {
                  // Store hash in your password DB.
                  await prisma.updateUser({
                    secret: hash
                  });
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
