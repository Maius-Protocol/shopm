import React, { ReactNode, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import classNames from "classnames";
import { ButtonState } from "@components/home/button";
import { message, Modal, Upload, UploadFile } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";

type Props = {
  handleThumbnailFile: (data: any) => void;
};

export function ProductThumbnail({ handleThumbnailFile }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileListThumbnail, setFileListThumbnail] = useState<UploadFile[]>([]);
  // handle preview thumbnail
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChangeThumbnail: UploadProps["onChange"] = ({
    file: thumbnailFile,
    fileList: newFileList,
  }) => {
    handleThumbnailFile(thumbnailFile);
    setFileListThumbnail(newFileList);
  };
  const handleCancelThumbnail = () => setPreviewOpen(false);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="http://localhost:3000"
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChangeThumbnail}
        accept=".png,.jpeg,.jpg"
        maxCount={1}
      >
        {fileListThumbnail.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelThumbnail}
      >
        <img alt="example" src={previewImage} />
      </Modal>
    </>
  );
}
