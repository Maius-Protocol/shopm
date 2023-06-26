import { CandyPay } from "@candypay/checkout-sdk";
import { getShopPayment } from "../database/payment";
import shop from "@pages/api/shop";

export const getSdk = async (shopId: string) => {
  const shopPayment = await getShopPayment(shopId);
  if (shopPayment) {
    return new CandyPay({
      api_keys: {
        private_api_key: shopPayment.candy_pay_private_key,
        public_api_key: shopPayment.candy_pay_public_key,
      },
      network: process.env.NODE_ENV === "production" ? "mainnet" : "devnet",
      config: {
        collect_shipping_address: false,
      },
    });
  }
  return null;
};

export default getSdk;
