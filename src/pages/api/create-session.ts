import { NextApiRequest, NextApiResponse } from "next";
import sdk, { getSdk } from "../../service/candy-pay/candypay";
import { getProduct } from "../../service/database/product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { productId } = req.body;
      const product = await getProduct(productId);
      const sdk = await getSdk(product!.shop_id);
      const response = await sdk!.session.create({
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        // additional tokens you can pass, SOL and USDC are default
        tokens: ["bonk", "samo"],
        items: [
          {
            name: product!.name,
            // price in USD
            price: parseFloat(product!.price),
            image: product!.image,
            quantity: 1,
          },
        ],
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error: "Error creating session",
      });
    }
  } else {
    res.status(405).json({
      error: "Method not allowed",
    });
  }
};

export default handler;
