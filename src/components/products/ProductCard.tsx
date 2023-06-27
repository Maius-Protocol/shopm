import { FC, useState } from "react";
import { Image, Button } from "antd";
import cx from "classnames";

import { fallbackImg } from "src/constants";
import { useRouter } from "next/router";

interface ProductCardProps {
  id: string;
  name: string;
  shop: string;
  price: number;
  image?: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  shop,
  price,
  image,
}) => {
  const router = useRouter();
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);

  const createSession = async (productId: string) => {
    try {
      setIsLoadingPurchase(true);
      const responseProduct = await fetch(`/api/shop/product?id=${productId}`, {
        method: "GET",
      });
      const product = await responseProduct.json();
      const response = await fetch("/api/create-session", {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
        }),
      });
      const data = await response.json();
      await fetch("/api/shop/order", {
        method: "POST",
        body: JSON.stringify({
          shopId: product.shop_id,
          productId: productId,
          sessionId: data.session_id,
          status: "pending",
        }),
      });
      router.push(data.payment_url);
      setIsLoadingPurchase(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={cx(
        "cursor-pointer border border-black rounded overflow-hidden",
        "transition-[0.14s] hover:shadow-[4px_4px_0px_0px_black]",
        "hover:translate-x-[-4px] hover:translate-y-[-4px]"
      )}
    >
      <Image
        alt={name}
        src={image}
        width="100%"
        fallback={fallbackImg}
        preview={false}
        className="border-b border-black aspect-square"
      />

      <div className="p-4 space-y-2 flex flex-col justify-between">
        <p className="text-black">{name}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <p className="underline text-black">{shop}</p>
          </div>
          <div className="w-min bg-[#ff8fe7] px-2 py-1 text-black border border-black">
            ${price}
          </div>
        </div>
      </div>

      <Button
        loading={isLoadingPurchase}
        size={"large"}
        type="primary"
        style={{ width: "100%", borderRadius: 0 }}
        danger
        onClick={(e: any) => createSession(id)}
      >
        Purchase
      </Button>
    </div>
  );
};
