import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { useDataFetch } from "@utils/use-data-fetch";
import { ItemData } from "@components/home/item";
import { Button, ButtonState } from "@components/home/button";
import { toast } from "react-hot-toast";
import { ed25519 } from "@noble/curves/ed25519";
import { useRouter } from "next/router";

export function HomeContent() {
  const router = useRouter();
  const { publicKey, signMessage, signTransaction } = useWallet();
  const [shopId, setShopId] = useState("");
  const [signState, setSignState] = React.useState<ButtonState>("initial");
  const prevPublickKey = React.useRef<string>(publicKey?.toBase58() || "");

  // Reset the state if wallet changes or disconnects
  useEffect(() => {
    if (publicKey && publicKey.toBase58() !== prevPublickKey.current) {
      prevPublickKey.current === publicKey.toBase58();
      setSignState("initial");
    }
  }, [publicKey]);

  // This will request a signature automatically but you can have a separate button for that
  useEffect(() => {
    async function sign() {
      if (publicKey && signTransaction && signState === "initial") {
        setSignState("loading");
        const signToastId = toast.loading("Signing message...");
        try {
          // `publicKey` will be null if the wallet isn't connected
          if (!publicKey) throw new Error("Wallet not connected!");
          // `signMessage` will be undefined if the wallet doesn't support it
          if (!signMessage)
            throw new Error("Wallet does not support message signing!");

          // Encode anything as bytes
          const message = new TextEncoder().encode("Hello, world!");
          // Sign the bytes using the wallet
          const signature = await signMessage(message);
          // Verify that the bytes were signed using the private key that matches the known public key
          if (!ed25519.verify(signature, message, publicKey.toBytes()))
            throw new Error("Invalid signature!");
          const getShopResponse = await fetch(
            `/api/shop?publicKey=${publicKey.toBase58()}`,
            {
              method: "GET",
            }
          );
          let shop = await getShopResponse.json();
          if (shop === null) {
            const createShopResponse = await fetch("/api/shop", {
              method: "POST",
              body: JSON.stringify({
                name: "",
                email: "",
                publicKey: publicKey.toBase58(),
              }),
            });

            shop = await createShopResponse.json();
          }
          setShopId(shop.id);
          setSignState("success");
          toast.success("Message signed", { id: signToastId });
        } catch (error: any) {
          console.log(error);
          setSignState("error");
          toast.error("Error verifying wallet, please reconnect wallet", {
            id: signToastId,
          });
        }
      }
    }

    sign();
  }, [signState, signTransaction, publicKey]);

  const onSignClick = () => {
    setSignState("initial");
  };

  const goShop = () => {
    router.push(`/creator/${shopId}`);
  };

  const hasFetchedData = publicKey && signState === "success";

  return (
    <div className="grid grid-cols-1">
      {hasFetchedData ? (
        <div className="text-center p-4">
          <Button state={signState} onClick={goShop} className="btn-primary">
            Go to shop
          </Button>
        </div>
      ) : (
        <div className="text-center">
          {!publicKey && (
            <div className="card border-2 border-primary mb-5">
              <div className="card-body items-center">
                <h2 className="card-title text-center text-primary mb-2">
                  Please connect your wallet to get a create shop
                </h2>
              </div>
            </div>
          )}
          {publicKey && signState === "error" && (
            <div className="card border-2 border-primary mb-5">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-center mb-2">
                  Please verify your wallet manually
                </h2>
                <Button
                  state={signState}
                  onClick={onSignClick}
                  className="btn-primary"
                >
                  Verify wallet
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
