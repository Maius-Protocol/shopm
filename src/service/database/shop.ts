import prisma from '../../../lib/prisma'

export const getAllShops = async () => {
  const shops = await prisma.shop.findMany({})
  return shops
}

export const getShop = async (id: any) => {
  const shop = await prisma.shop.findUnique({
    where: { id }
  })
  return shop
}

export const createShop = async (email: string, name: string, publicKey: string) => {
  const shop = await prisma.shop.create({
    data: {
      email,
      name,
      publicKey,
    }
  })
  return shop
}


export const getShopByPublicKey = async (publicKey: any) => {
  const shop = await prisma.shop.findFirst({
    where: { publicKey: publicKey }
  })
  return shop
}

export const updateShop = async (id: any, updateData: any) => {
  const shop = await prisma.shop.update({
    where: {
      id
    },
    data: {
      ...updateData
    }
  })
  return shop
}

export const deleteShop = async (id: any) => {
  const shop = await prisma.shop.delete({
    where: {
      id
    }
  })
  return shop
}
