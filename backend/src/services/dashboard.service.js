const prisma =
  require("../config/prisma")

const getStats = async () => {

  const totalSales =
    await prisma.bill.aggregate({
      _sum: {
        totalAmount: true,
      },
    })

  const today = new Date()

  today.setHours(0, 0, 0, 0)

  const todaySales =
    await prisma.bill.aggregate({
      where: {
        createdAt: {
          gte: today,
        },
      },
      _sum: {
        totalAmount: true,
      },
    })

  const dueAmount =
    await prisma.customer.aggregate({
      _sum: {
        currentBalance: true,
      },
    })

  const products =
    await prisma.product.findMany()

  const lowStock =
    products.filter(
      (p) => p.stock <= p.minimumStock
    ).length

  return {
    totalSales:
      totalSales._sum.totalAmount || 0,

    todaySales:
      todaySales._sum.totalAmount || 0,

    dueAmount:
      dueAmount._sum.currentBalance || 0,

    lowStock,
  }
}

  const getMonthlySales =
  async () => {

    const sales =
      await prisma.$queryRaw`

      SELECT
        TO_CHAR(
          "createdAt",
          'Mon'
        ) as month,

        SUM(
          "totalAmount"
        )::integer as sales

      FROM "Bill"

      GROUP BY month

      ORDER BY MIN(
        "createdAt"
      )

    `

    return sales
  }


const getDashboardStats = async () => {

  const products =
    await prisma.product.count();

  const customers =
    await prisma.customer.count();

  const bills =
    await prisma.bill.findMany();

  const todaySales =
    bills.reduce(
      (acc, bill) =>
        acc + bill.totalAmount,
      0
    );

  return {
    products,
    customers,
    todaySales,
  };
};

module.exports = {
  getStats,
  getMonthlySales,
  getDashboardStats
}