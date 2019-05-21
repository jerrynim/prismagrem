export default {
  Mutation: {
    uploadFile: async (_, args) => {
      console.log(args.file);
      console.log(args.file.__proto__);
    }
  }
};
