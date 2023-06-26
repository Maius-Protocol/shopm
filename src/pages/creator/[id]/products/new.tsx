import { useState } from "react";
import { Input, Upload, message, UploadFile, Modal } from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import {
  RiFolderOpenFill,
  RiBook2Fill,
  RiMoneyDollarCircleLine,
  RiVideoUploadFill,
} from "react-icons/ri";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { CreatorPagesLayout, ProductTypeCard } from "@components/creator";
import { ProductThumbnail } from "@components/product/thumbnail";
import { useRouter } from "next/router";

const productTypes = [
  {
    id: "0",
    name: "Image",
    description: "Any set of files to download or stream.",
    Icon: RiFolderOpenFill,
    iconColor: "#ff8fe7",
  },
  {
    id: "1",
    name: "Ebook",
    description: "Offer a book or comic in PDF, ePub, and Mobi formats.",
    Icon: RiBook2Fill,
    iconColor: "#ffc800",
  },
  {
    id: "2",
    name: "Video",
    description: "Make episodes available for streaming and direct downloads.",
    Icon: RiVideoUploadFill,
    iconColor: "#ff7151",
  },
];

const EditorFormat = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const EditorModule = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const CreatorNewProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [typeId, setTypeId] = useState<string | undefined>();
  const [fileUploadData, setFileUploadData] = useState<any | undefined>();
  const [fileUploadThumbnail, setFileUploadThumbnail] = useState<
    any | undefined
  >();

  // handler upload data
  const { Dragger } = Upload;

  const propData: UploadProps = {
    name: "file",
    multiple: false,
    action: "http://localhost:3000",
    accept: ".png,.jpeg,.jpg,.mp4,.pdf",
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setFileUploadData(info.file);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const callbackThumbnailFunction = (data: any) => {
    setFileUploadThumbnail(data);
  };
  const handleChangeEditor = (html: any) => {
    setEditorHtml(html);
  };

  const createProduct = async () => {
    const uploadFileDataResponse = await fetch("/api/shop/product/upload", {
      method: "POST",
      body: JSON.stringify({
        name: fileUploadData!.name,
        type: fileUploadData!.type,
      }),
    });
    const uploadFileThumbnailResponse = await fetch(
      "/api/shop/product/upload",
      {
        method: "POST",
        body: JSON.stringify({
          name: fileUploadThumbnail!.name,
          type: fileUploadThumbnail!.type,
        }),
      }
    );
    const uploadFileData = await uploadFileDataResponse.json();
    const uploadFileThumbnail = await uploadFileThumbnailResponse.json();
    const category = productTypes.filter((type) => (type.id = typeId!))[0];
    const createProductResponse = await fetch("/api/shop/product", {
      method: "POST",
      body: JSON.stringify({
        shopId: id,
        name: name,
        description: editorHtml,
        category: category.name,
        price: price,
        quantity: "10",
        image: uploadFileThumbnail.url,
        linkS3: uploadFileData.url,
      }),
    });
    router.push(`/creator/${id}/products`);
  };

  return (
    <CreatorPagesLayout header="Adding new product">
      <div className="flex gap-[64px]">
        <div className="flex-[1] space-y-6">
          <p className="text-black">
            Make some selections, fill in some boxes, and go live in minutes.
          </p>
          <p className="text-black">
            Our Help Center has everything you need to know.
          </p>
        </div>
        <div className="flex-[3] space-y-6">
          <div className="space-y-2">
            <p className="text-black text-lg">Name</p>
            <Input
              placeholder="Name of product"
              size="large"
              className="rounded border-black"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <p className="text-black text-lg">Type</p>
            <div className="grid grid-cols-3 gap-4">
              {productTypes.map((type) => (
                <ProductTypeCard
                  name={type.name}
                  description={type.description}
                  isSelected={type.id === typeId}
                  Icon={type.Icon}
                  iconColor={type.iconColor}
                  onClick={() => setTypeId(type.id)}
                  key={type.id}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-black text-lg">Description</p>
            <ReactQuill
              theme={"snow"}
              onChange={handleChangeEditor}
              value={editorHtml}
              modules={EditorModule}
              formats={EditorFormat}
              placeholder={"Writing something..."}
            />
          </div>
          <div className="space-y-2">
            <p className="text-black text-lg">Thumbnail</p>
            <ProductThumbnail
              handleThumbnailFile={callbackThumbnailFunction}
            ></ProductThumbnail>
          </div>
          <div className="space-y-2">
            <p className="text-black text-lg">Upload</p>
            <Dragger {...propData}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Upload image, pdf or video</p>
            </Dragger>
          </div>

          <div className="space-y-2">
            <p className="text-black text-lg">Price</p>
            <Input
              placeholder="Price your product"
              size="large"
              prefix={<RiMoneyDollarCircleLine />}
              className="rounded border-black"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button
            onClick={createProduct}
            className="bg-pink_primary px-4 py-3 text-black border border-black rounded"
          >
            Add Product
          </button>
        </div>
      </div>
    </CreatorPagesLayout>
  );
};

export default CreatorNewProduct;
