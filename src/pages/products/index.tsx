import { Header } from "@components/Header";

import { ProductCard } from "@components/products";

const products = [
  {
    id: "1",
    title: "Product 1",
    creator: "Owner 1",
    price: 99,
  },
  {
    id: "2",
    title: "Product 2",
    creator: "Owner 2",
    price: 199,
  },
  {
    id: "3",
    title: "Product 3",
    creator: "Owner 3",
    price: 299,
  },
  {
    id: "4",
    title: "Product 4",
    creator: "Owner 4",
    price: 399,
  },
  {
    id: "5",
    title: "Product 5",
    creator: "Owner 5",
    price: 499,
  },
  {
    id: "6",
    title: "Product 6",
    creator: "Owner 6",
    price: 599,
  },
];

const Products = () => {
  return (
    <>
      <Header />
      <div className="py-[64px]">
        <div className="max-w-[1140px] mx-auto space-y-6">
          <h2 className="text-black text-2xl">All Products</h2>
          <div className="grid grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                creator={product.creator}
                buyFn={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
