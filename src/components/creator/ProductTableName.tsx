import { FC } from "react";
import { Space, Avatar } from "antd";
import Link from "next/link";

interface ProductTableNameProps {
  name: string;
  url: string;
}

export const ProductTableName: FC<ProductTableNameProps> = ({ name, url }) => {
  return (
    <Space direction={"vertical"}>
      <div className="text-black text-base">{name}</div>
      <Link
        href={`/products`}
        className="text-gray-400 hover:text-gray-500 text-sm underline underline-offset-1"
      >
        Go to product
      </Link>
    </Space>
  );
};
