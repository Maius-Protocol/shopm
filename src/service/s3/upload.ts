import * as fs from "fs";
import { bucket, s3 } from "../../config/s3";
import { ConvertS3UrlToCDN } from "../../config/constants";
import mime from "mime";

const mimetype = "image/jpeg";
export const uploadImageToStorage = async (
  fileName: string,
  file: string
): Promise<string> => {
  // @ts-ignore
  const fileStream = fs.createReadStream(file);
  const fileExtension = mime.getExtension(mimetype);
  try {
    const uploadImageResponse = await s3
      .upload({
        Bucket: bucket!,
        Key: `${fileName}${fileExtension ? "." + fileExtension : ""}`,
        Body: fileStream,
        ContentType: mimetype,
      })
      .promise();
    const uploadImageCdnUrl = ConvertS3UrlToCDN(uploadImageResponse.Key);

    return uploadImageCdnUrl;
  } catch (e) {
    throw Error("Can not upload this photo to cloud provider");
  }
};
