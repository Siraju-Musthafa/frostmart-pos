const prisma = require("../config/prisma");

const today = new Date();

const createProduct = async (data) => {
  return prisma.product.create({
    data,
    include: {
      category: true,
    },
  });
};

const getProducts = async () => {
  return prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const lowStockProducts = async () => {
  return prisma.product.findMany({
    where: {
      stock: {
        lte: 5,
      },
    },
    include: {
      category: true,
    },
  });
};

const expiredProducts = async () => {
  return prisma.product.findMany({
    where: {
      expiryDate: {
        lt: today,
      },
    },
    include: {
      category: true,
    },
  });
};
const deleteProduct =
  async (id) => {

    return prisma.product.delete({

      where: { id },

    });
};

const updateProduct =
  async (id, data) => {

    return prisma.product.update({

      where: { id },

      data,

    });
};

module.exports = {
  createProduct,
  getProducts,
  lowStockProducts,
  expiredProducts,
  deleteProduct,
  updateProduct
};