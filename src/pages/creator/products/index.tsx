import { useRouter } from "next/router";

import {
  CreatorPagesLayout,
  ProductInfoCard,
  ProductsTable,
  ProductType,
} from "../../../components/creator";

const data: ProductType[] = [
  {
    id: "1",
    name: "Product 1",
    sales: 0,
    revenue: 0,
    price: 0,
  },
  {
    id: "2",
    name: "Product 2",
    sales: 0,
    revenue: 0,
    price: 0,
  },
  {
    id: "3",
    name: "Product 3",
    sales: 0,
    revenue: 0,
    price: 0,
  },
  {
    id: "4",
    name: "Product 4",
    sales: 0,
    revenue: 0,
    price: 0,
  },
  {
    id: "5",
    name: "Product 5",
    sales: 0,
    revenue: 0,
    price: 0,
  },
  {
    id: "6",
    name: "Product 6",
    sales: 0,
    revenue: 0,
    price: 0,
  },
];

const CreatorProducts = () => {
  const router = useRouter();

  return (
    <CreatorPagesLayout
      header="Products"
      headerButton={{
        text: "Add Product",
        onClickFn: () => {
          router.push("/creator/products/new");
        },
      }}
    >
      <div className="space-y-[64px]">
        <div className="flex gap-4">
          <ProductInfoCard title="Revenue" amount={0} isDollar />
          <ProductInfoCard title="Customers" amount={0} />
          <ProductInfoCard title="Active Members" amount={0} />
          <ProductInfoCard title="MRR" amount={0} isDollar />
        </div>
        <div className="space-y-4">
          <h2 className="text-black text-2xl">Products</h2>
          <ProductsTable data={data} />
        </div>
      </div>
    </CreatorPagesLayout>
  );
};

export default CreatorProducts;
