import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import * as fs from "fs";
import { v4 } from "uuid";
import { bucket, folderS3, s3 } from "../../../../config/s3";
import { ConvertS3UrlToCDN } from "../../../../config/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { errorParseFile, fields, files } = await parseForm(req);
    console.log(files);
    // @ts-ignore
    let fileStream = fs.createReadStream(files.filename[0].filepath);
    const fileName = `${folderS3}/data/${v4()}`;
    // @ts-ignore
    let type = files.filename[0].mimetype;
    let fileExtension;
    if (type.includes(".")) {
      fileExtension = type.split(".").pop();
    } else if (type.includes("/")) {
      fileExtension = type.split("/").pop();
    }
    const params = {
      Bucket: bucket!,
      Key: `${fileName}.${fileExtension}`,
      Body: fileStream,
      ContentType: type,
      Expires: 600,
    };
    // @ts-ignore
    const uploadFileResponse = await s3.upload(params).promise();
    const url = ConvertS3UrlToCDN(uploadFileResponse.Key);
    return res.status(200).json({ url });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export default handler;

export const parseForm = async (
  req: NextApiRequest
): Promise<{
  errorParseFile: Error;
  fields: formidable.Fields;
  files: formidable.Files;
}> => {
  return new Promise(async (resolve, reject) => {
    const form = formidable({
      maxFiles: 1,
      maxFileSize: 1024 * 1024, // 1mb
    });
    form.parse(req, function (errorParseFile, fields, files) {
      if (errorParseFile) resolve({ errorParseFile, fields, files });
      else resolve({ errorParseFile, fields, files });
    });
  });
};

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};
