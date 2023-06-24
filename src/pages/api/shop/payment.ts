import { NextApiRequest, NextApiResponse } from "next";

import { createShopPayment, updateShopPayment } from "../../../service/database/payment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":{
        const { shopId, candyPayPublicKey, candyPayPrivateKey } = req.body
        const shop = await createShopPayment(shopId, candyPayPublicKey, candyPayPrivateKey)
        res.status(200).json(shop)
      }
      case 'PUT': {
        // Update an existing user
        const { id, ...updateData } = req.body
        const shop = await updateShopPayment(id, updateData)
        res.status(200).json(shop)
      }
      default:
        break
    }
    return
  } catch (error) {
    res.status(500).json({message: "Internal server error", error: error});
    return
  }

};

export default handler;
