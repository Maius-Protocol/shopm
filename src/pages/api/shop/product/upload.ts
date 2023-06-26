import { NextApiRequest, NextApiResponse } from "next";
import { uploadImageToStorage } from "../../../../service/s3/upload";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    let { name, type } = JSON.parse(req.body);
    let url = "abc";
    // const url = await uploadImageToStorage(name, type);

    res.status(200).json({ url });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default handler;
