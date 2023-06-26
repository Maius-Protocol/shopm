import {
  CreatorPagesLayout,
  ProductsInfoCard,
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
  return (
    <CreatorPagesLayout
      header="Products"
      headerButton={{
        text: "Add Product",
        onClickFn: () => {},
      }}
    >
      <div className="space-y-[64px]">
        <div className="flex gap-4">
          <ProductsInfoCard title="Revenue" amount={0} isDollar />
          <ProductsInfoCard title="Customers" amount={0} />
          <ProductsInfoCard title="Active Members" amount={0} />
          <ProductsInfoCard title="MRR" amount={0} isDollar />
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
