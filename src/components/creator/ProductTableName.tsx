import { FC } from "react";
import { Space, Avatar } from "antd";

interface ProductTableNameProps {
  name: string;
  url: string;
}

export const ProductTableName: FC<ProductTableNameProps> = ({ name, url }) => {
  console.log(name);
  return (
    <Space direction={"vertical"}>
      <div>{name}</div>
      <div>{url}</div>
    </Space>
  );
};
