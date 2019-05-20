const storeFS = ({ stream, filename }) => {
  const id = Date.now();
  const path = `${uploadDir}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", (error) => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on("error", (error) => reject(error))
      .on("finish", () => resolve({ id, path }))
  );
};

const processUpload = async (upload) => {
  try {
    console.log(upload);
    const { stream, filename, mimetype, encoding } = await upload;
    console.log(stream, filename, mimetype, encoding);
    return await storeFS({ stream, filename });
  } catch (error) {
    logger.log(error);
  }
};

export default {
  Mutation: {
    uploadFile: async (obj, upload) => {
      Promise(upload);
      try {
        processUpload(await upload);
        await console.log(upload);
      } catch (e) {
        console.log(e.message);
      }
    }
  }
};
