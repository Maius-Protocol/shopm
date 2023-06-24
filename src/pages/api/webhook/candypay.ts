import { NextApiRequest, NextApiResponse } from "next";
import { verifyWebhookSignature } from "@candypay/checkout-sdk";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;
  const payload = req.body;
  if (req.method === "POST") {
    try {
      await verifyWebhookSignature({
        payload: JSON.stringify(payload),
        headers: headers as Record<string, string>,
        webhook_secret: process.env.WEBHOOK_SECRET!,
      });
      console.log(payload);
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(400).json({
        message: "Invalid webhook signature",
      });
    }
  } else {
    res.status(405).json({
      error: "Method not allowed",
    });
  }
};

export default handler;
