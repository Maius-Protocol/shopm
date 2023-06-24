import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";
import { getProduct } from "../service/database/product";

const Checkout: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const productId = "6495215c86fe3e14744faba8";
  const createSession = async () => {
    setIsLoading(true);
    const product = await getProduct(productId)
    const response = await fetch("/api/create-session", {
      method: "POST",
      body: JSON.stringify({
        shopId: product?.shop_id
      })
    });
    const data = await response.json();

    router.push(data.payment_url);
    setIsLoading(false);
  };

  return (
    <main>
      <p>Welcome to Gumsol.</p>
      <button onClick={createSession}>
        Checkout
      </button>
    </main>
  );
};

export default Checkout;
