import { NextApiRequest, NextApiResponse } from "next";

import {
  createShopPayment,
  updateShopPayment,
} from "../../../service/database/payment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST": {
        const { shopId, candyPayPublicKey, candyPayPrivateKey } = req.body;
        const shop = await createShopPayment(
          shopId,
          candyPayPublicKey,
          candyPayPrivateKey
        );
        return res.status(200).json(shop);
      }
      case "PUT": {
        // Update an existing user
        const { id, ...updateData } = req.body;
        const shop = await updateShopPayment(id, updateData);
        return res.status(200).json(shop);
      }
      default:
        return res.status(200);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export default handler;
