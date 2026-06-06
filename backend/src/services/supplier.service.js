const prisma =
  require("../config/prisma")

// CREATE SUPPLIER
const createSupplier =
  async (data) => {

    return prisma.supplier.create({
      data,
    })
  }

// GET ALL SUPPLIERS
const getSuppliers =
  async () => {

    return prisma.supplier.findMany({

      orderBy: {
        createdAt: "desc",
      },
    })
  }

module.exports = {
  createSupplier,
  getSuppliers,
}