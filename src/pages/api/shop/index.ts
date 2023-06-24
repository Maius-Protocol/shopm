import { NextApiRequest, NextApiResponse } from "next";
import {
  createShop,
  deleteShop,
  getAllShops,
  getShop,
  getShopByPublicKey,
  updateShop,
} from "../../../service/database/shop";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      switch (req.method) {
        case "POST":{
          const { email, name, publicKey } = req.body
          const shop = await createShop(email, name, publicKey)
          return res.status(200).json(shop)
        }
        case "GET": {
          if (req.query.id) {
            const shop = await getShop(req.query.id)
            return res.status(200).json(shop)
          } else if (req.query.publicKey){
            const shop = await getShopByPublicKey(req.query.publicKey)
            return res.status(200).json(shop)
          } else {
            // Otherwise, fetch all users
            const shops = await getAllShops()
            return res.status(200).json(shops)
          }
        }
        case 'PUT': {
          // Update an existing user
          const { id, ...updateData } = req.body
          const shop = await updateShop(id, updateData)
          return res.status(200).json(shop)
        }
        case 'DELETE': {
          // Delete an existing user
          const { id } = req.body
          const shop = await deleteShop(id)
          return res.status(200).json(shop)
        }
        default:
          break
      }
      return
    } catch (error) {
      return res.status(500).json({message: "Internal server error", error: error});
    }

};

export default handler;
