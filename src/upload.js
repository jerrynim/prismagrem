import IncomingForm from "formidable";
import aws from "aws-sdk";
import uuid from "uuid/v1";
import { createReadStream } from "fs";
const upload = (req, res) => {
  let form = new IncomingForm();
  form.on("file", async (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    const s3 = new aws.S3({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRET_ACCESSKEYID,
      params: {
        Bucket: "jerrynim-instagram"
      }
    });

    const key = uuid() + "-" + file.name;
    const stream = createReadStream(file.path);
    // Upload to S3
    const response = await s3
      .upload({
        Key: key,
        ACL: "public-read",
        Body: stream
      })
      .promise()
      .catch();

    const url = response.Location;
    res.json(url);
  });
  form.on("end", () => {});
  form.parse(req);
};
export default upload;
