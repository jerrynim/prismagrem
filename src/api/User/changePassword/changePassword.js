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
      return promiseSecret.then((secretCheck) => {
        //secretCheck는 비밀번화 확인 결과
        if (secretCheck) {
          //비밀먼호 일치
          const promiseComparePrevSecret = new Promise((resolve, reject) => {
            //새 비밀번호가 이전 비밀번호와 일치하는지
            const hashedSecret = bcrypt.compareSync(newPs, user.secret);
            resolve(hashedSecret);
          });
          return promiseComparePrevSecret.then(async (result) => {
            if (result) {
              return "이전 비밀번호와 일치합니다.";
            } else {
              //새 비밀번호를 해쉬해서 저장
              const newSecret = await bcrypt.hashSync(
                newPs,
                parseInt(process.env.BYCRIPT_ROUNDS)
              );
              await prisma.updateUser({
                data: { secret: newSecret },
                where: { id: user.id }
              });

              return "비밀번호가 변경되었습니다.";
            }
          });
        } else {
          return "비밀번호가 옳바르지 않습니다.";
        }
      });
    }
  }
};
