import { NextApiRequest, NextApiResponse } from "next";
import { verifyWebhookSignature } from "@candypay/checkout-sdk";
import { sendEmail } from "../../../service/mail/mail";
import {
  getOrder,
  getOrderBySessionId,
  updateOrder,
} from "../../../service/database/order";
import verifyEmailTemplate from "../../../template/verifyTemplate";
import { onErrorResumeNext } from "rxjs";

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

      // const orders = await getOrderBySessionId(payload.session_id);
      const orderId = payload.order_id;

      //SEND VERIFICATION MAIL TO USER
      const emailTemplate = verifyEmailTemplate(payload.items, orderId);
      const info = await sendEmail(req.headers["X-Request-Id"]!, {
        from: "Shopm",
        to: payload.customer_email,
        subject: `Order ${orderId} confirmed`,
        html: emailTemplate.html,
      });
      const orders = await getOrderBySessionId(payload.session_id);
      await Promise.all(
        orders.map(async (order) => {
          const orderNew = await updateOrder(order.id, { status: "success" });
          console.log(orderNew);
        })
      );
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
