import { NextApiRequest, NextApiResponse } from "next";
import {
  createOrder,
  getOrder,
  getOrderByProuctId,
  getOrderByShopId,
  updateOrder,
} from "../../../service/database/order";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST": {
        const body = JSON.parse(req.body);
        const { shopId, productId, sessionId, status } = body;
        const order = await createOrder(shopId, productId, sessionId, status);
        res.status(200).json(order);
      }
      case "GET": {
        if (req.query.id) {
          const order = await getOrder(req.query.id);
          return res.status(200).json(order);
        } else if (req.query.shopId) {
          const orders = await getOrderByShopId(req.query.shopId);
          return res.status(200).json(orders);
        } else if (req.query.productId) {
          const orders = await getOrderByProuctId(req.query.productId);
          return res.status(200).json(orders);
        }
      }
      case "PUT": {
        const { id, ...updateData } = req.body;
        const order = await updateOrder(id, updateData);
        res.status(200).json(order);
      }
      default:
        break;
    }
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
    return;
  }
};

export default handler;
