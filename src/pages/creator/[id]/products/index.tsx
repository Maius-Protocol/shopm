import { useRouter } from "next/router";

import {
  CreatorPagesLayout,
  ProductInfoCard,
  ProductsTable,
  ProductType,
} from "@components/creator";
import { useEffect, useState } from "react";

const CreatorProducts = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const responseProduct = await fetch(`/api/shop/product?shop_id=${id}`, {
        method: "GET",
      });
      const products = await responseProduct.json();
      setData(products);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <CreatorPagesLayout
      header="Products"
      headerButton={{
        text: "Add Product",
        onClickFn: () => {
          router.push(`/creator/${id}/products/new`);
        },
      }}
    >
      <div className="space-y-[64px]">
        <div className="flex gap-4">
          <ProductInfoCard title="Revenue" amount={0} isDollar />
          <ProductInfoCard title="Customers" amount={0} />
          <ProductInfoCard title="Active Members" amount={0} />
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
