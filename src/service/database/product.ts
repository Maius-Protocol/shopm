import prisma from "../../../lib/prisma";
import { generateId } from "../snowflake/generate-id";

export const createProduct = async (
  shopId: string,
  name: string,
  description: string,
  category: string,
  price: string,
  quantity: string,
  image: string,
  link_s3: string
) => {
  const id = await generateId();
  const product = await prisma.product.create({
    data: {
      id: id,
      shop_id: shopId,
      name: name,
      description: description,
      category: category,
      price: price,
      quantity: quantity,
      image: image,
      link_s3: link_s3,
    },
  });
  return product;
};

export const getProductByShopId = async (shopId: any) => {
  const products = await prisma.product.findMany({
    where: {
      shop_id: shopId,
    },
  });
  return products;
};

export const getProduct = async (id: any) => {
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });
  return product;
};

export const getAllProduct = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export const updateProduct = async (id: string, updateData: any) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
  });
  return product;
};
