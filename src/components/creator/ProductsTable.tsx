import { FC } from "react";
import { Avatar, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ProductTableName } from "@components/creator/ProductTableName";

export interface ProductType {
  id: string;
  name: string;
  image: string;
  sale: number;
  quantity: number;
  price: number;
}

const productsColumns: ColumnsType<ProductType> = [
  {
    title: "",
    dataIndex: "image",
    render: (image: string) => <Avatar size={64} src={image} />,
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (name: string, record) => (
      <ProductTableName name={name} url={record.id}></ProductTableName>
    ),
    width: "30%",
  },
  {
    title: "Sale",
    dataIndex: "id",
    render: (sale: number) => <p>0</p>,
    width: "15%",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    render: (quantity: number) => <p>{quantity}</p>,
    width: "15%",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (price: number) => <p>${price}</p>,
    width: "15%",
  },
  {
    title: "",
    dataIndex: "id",
    render: (id: string) => <RiDeleteBin5Fill onClick={() => {}} />,
    width: "5%",
    align: "right",
  },
];

export const ProductsTable: FC<{ data: ProductType[] }> = ({ data }) => {
  return <Table columns={productsColumns} dataSource={data} rowKey="id" />;
};
