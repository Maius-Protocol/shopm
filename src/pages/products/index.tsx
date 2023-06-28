import { Header } from "@components/Header";
import { Card, Breadcrumb } from "antd";
import { ProductCard } from "@components/products";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ProductData {
  id: string;
  name: string;
  shop: string;
  price: number;
  image?: string;
}

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setLoading] = useState(false);
  let productList: ProductData[] = [];
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const responseProduct = await fetch(`/api/shop/product`, {
        method: "GET",
      });
      const data = await responseProduct.json();
      await Promise.all(
        data.map(async (p: any) => {
          const responseShop = await fetch(`/api/shop?id=${p.shop_id}`, {
            method: "GET",
          });
          const shop = await responseShop.json();
          productList!.push({
            id: p.id,
            name: p.name,
            shop: shop.name,
            price: p.price,
            image: p.image,
          });
        })
      );
      setProducts(productList);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="py-[64px]">
        <div className="max-w-[1140px] mx-auto space-y-6">
          <Breadcrumb
            items={[
              {
                title: <a href="">Digital Image</a>,
              },
              {
                title: <a href="">Book</a>,
              },
              {
                title: <a href="">Video</a>,
              },
            ]}
          />
          <h2 className="text-black text-2xl">Best selling products</h2>
          <Card
            style={{ width: "100%", minHeight: "500px", padding: "20px" }}
            loading={isLoading}
          >
            <div className="grid grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  shop={product.shop}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Products;
