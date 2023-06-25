import prisma from "../../../lib/prisma";
import { or } from "multiformats/bases/base";

export const createOrder = async (
  shopId: string,
  productId: string,
  sessionId: string,
  status: string
) => {
  const order = await prisma.order.create({
    data: {
      shop_id: shopId,
      product_id: productId,
      session_id: sessionId,
      status: status,
    },
  });
  return order;
};

export const getOrderByShopId = async (shopId: any) => {
  const orders = await prisma.order.findMany({
    where: {
      shop_id: shopId,
    },
  });
  return orders;
};

export const getOrderByProuctId = async (productId: any) => {
  const orders = await prisma.order.findMany({
    where: {
      product_id: productId,
    },
  });
  return orders;
};

export const getOrder = async (id: any) => {
  const order = await prisma.order.findFirst({
    where: {
      id: id,
    },
  });
  return order;
};

export const updateOrder = async (id: string, updateData: any) => {
  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
  });
  return order;
};
