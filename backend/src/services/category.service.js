const prisma = require("../config/prisma")

const createCategory = async (data) => {
  const existing = await prisma.category.findUnique({
    where: {
      name: data.name,
    },
  })

  if (existing) {
    throw new Error("Category already exists")
  }

  return prisma.category.create({
    data,
  })
}

const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

const updateCategory =
  async (id, data) => {

    return prisma.category.update({

      where: { id },

      data,

    });
};

const deleteCategory =
  async (id) => {

    const category =
      await prisma.category.findUnique({

        where: { id },

        include: {
          products: true,
        },

      });

    if (
      category.products.length > 0
    ) {

      throw new Error(
        "Cannot delete category with products"
      );

    }

    return prisma.category.delete({

      where: { id },

    });
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
}