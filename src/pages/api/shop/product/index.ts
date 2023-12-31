import { NextApiRequest, NextApiResponse } from "next";
import {
  createShop,
  getAllShops,
  getShop,
  getShopByPublicKey,
} from "../../../../service/database/shop";
import {
  createProduct,
  getAllProduct,
  getProduct,
  getProductByShopId,
  updateProduct,
} from "../../../../service/database/product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST": {
        const {
          shopId,
          name,
          description,
          category,
          price,
          quantity,
          image,
          linkS3,
        } = JSON.parse(req.body);
        const shop = await createProduct(
          shopId,
          name,
          description,
          category,
          price,
          quantity,
          image,
          linkS3
        );
        return res.status(200).json(shop);
      }
      case "GET": {
        if (req.query.id) {
          const products = await getProduct(req.query.id);
          return res.status(200).json(products);
        } else if (req.query.shopId) {
          const product = await getProductByShopId(req.query.shopId);
          return res.status(200).json(product);
        } else {
          const products = await getAllProduct();
          return res.status(200).json(products);
        }
      }
      case "PUT": {
        const { id, ...updateData } = req.body;
        const product = await updateProduct(id, updateData);
        return res.status(200).json(product);
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
