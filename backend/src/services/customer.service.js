const prisma = require("../config/prisma")

const createCustomer = async (data) => {
  return prisma.customer.create({
    data,
  })
}

const getCustomers = async () => {
  return prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

module.exports = {
  createCustomer,
  getCustomers,
}