const prisma =
  require("../config/prisma")

const getSales = async (
  page = 1,
  limit = 10,
  search = ""
) => {

  const skip =
    (page - 1) * limit

  const where = search
    ? {
        customer: {
          hotelName: {
            contains: search,
            mode: "insensitive",
          },
        },
      }
    : {}

  const sales =
    await prisma.bill.findMany({

      where,

      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: Number(limit),

    })

  const total =
    await prisma.bill.count({
      where,
    })

  return {
    sales,
    total,
    page,
    totalPages:
      Math.ceil(total / limit),
  }
}


module.exports = {
  getSales,
}