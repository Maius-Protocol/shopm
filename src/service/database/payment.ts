import prisma from "../../../lib/prisma";

export const createShopPayment = async (shopId: string, candyPayPublicKey: string, candyPayPrivateKey: string) => {
  const shopPayment = await prisma.payment.create({
    data: {
      shop_id: shopId,
      candy_pay_public_key: candyPayPublicKey,
      candy_pay_private_key: candyPayPrivateKey,
    }
  })
  return shopPayment
}


export const getShopPayment= async (shopId: string) => {
  const shopPayment = await prisma.payment.findFirst({
    where: {
      shop_id: shopId,
    }
  })
  return shopPayment
}


export const updateShopPayment = async (id: string, updateData: any) => {
  const shopPayment = await prisma.payment.update({
    where: {
      id
    },
    data: {
      ...updateData
    }
  })
  return shopPayment
}
