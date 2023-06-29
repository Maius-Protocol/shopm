import { CandyPay } from "@candypay/checkout-sdk";
import { getShopPayment } from "../database/payment";
import shop from "@pages/api/shop";

export const getSdk = async () => {
  return new CandyPay({
    api_keys: {
      private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
      public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY!,
    },
    network:
      process.env.CANDY_PAY_NETWORK === "production" ? "mainnet" : "devnet",
    config: {
      collect_shipping_address: false,
    },
  });
};

export default getSdk;
