import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";
import { Button } from "antd";

const Checkout: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const productId = "64973d0c19bede09019caa1a";
  const createSession = async () => {
    setIsLoading(true);
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
    const responseOrder = await fetch("/api/shop/order", {
      method: "POST",
      body: JSON.stringify({
        shopId: product.shop_id,
        productId: productId,
        sessionId: data.session_id,
        status: "pending",
      }),
    });
    console.log(await responseOrder.json());
    // router.push(data.payment_url);
    setIsLoading(false);
  };

  return (
    <main>
      <p>Welcome to Gumsol.</p>
      <Button loading={isLoading} onClick={createSession}>
        Checkout
      </Button>
    </main>
  );
};

export default Checkout;
