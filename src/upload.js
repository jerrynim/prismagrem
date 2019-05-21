import { bodyParser } from "body-parser";

const upload = (req, res) => {
  console.log(req.bodyParser());
  return res.json();
};
export default upload;
