import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";

const Checkout: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createSession = async () => {
    setIsLoading(true);
    const response = await fetch("/api/create-session", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data)
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
