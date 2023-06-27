import { NextApiRequest, NextApiResponse } from "next";
import sdk, { getSdk } from "../../service/candy-pay/candypay";
import { getProduct } from "../../service/database/product";
import verifyEmailTemplate from "../../template/verifyTemplate";
import { sendEmail } from "../../service/mail/mail";
import * as process from "process";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { productId } = JSON.parse(req.body);
      const product = await getProduct(productId);
      const sdk = await getSdk();
      const response = await sdk!.session.create({
        success_url: `${process.env.URL}/success`,
        cancel_url: `${process.env.URL}/cancel`,
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
      console.log(error);
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
