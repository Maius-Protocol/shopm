import { FC } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBin5Fill } from "react-icons/ri";

export interface ProductType {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  price: number;
}

const productsColumns: ColumnsType<ProductType> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name: string) => <p className="font-bold">{name}</p>,
    width: "40%",
  },
  {
    title: "Sales",
    dataIndex: "sales",
    render: (sales: number) => <p className="underline">{sales}</p>,
    width: "15%",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    render: (revenue: number) => <p>${revenue}</p>,
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
  return <Table columns={productsColumns} dataSource={data} />;
};
