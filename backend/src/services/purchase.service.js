const prisma =
  require("../config/prisma")

const createPurchase =
  async (data) => {

    const {
      supplierId,
      items,
    } = data

    return prisma.$transaction(
      async (tx) => {

        // CALCULATE TOTAL
        let totalAmount = 0

        items.forEach((item) => {

          totalAmount +=
            item.quantity *
            item.purchasePrice
        })

        // CREATE PURCHASE
        const purchase =
          await tx.purchase.create({

            data: {
              supplierId,
              totalAmount,
            },
          })

        // LOOP ITEMS
        for (const item of items) {

          // CREATE PURCHASE ITEM
          await tx.purchaseItem.create({

            data: {
              purchaseId:
                purchase.id,

              productId:
                item.productId,

              quantity:
                item.quantity,

              purchasePrice:
                item.purchasePrice,
            },
          })

          // INCREASE STOCK
          await tx.product.update({

            where: {
              id: item.productId,
            },

            data: {
              stock: {
                increment:
                  item.quantity,
              },

              purchasePrice:
                item.purchasePrice,
            },
          })
        }

        return purchase
      }
    )
  }

const getPurchases =
  async () => {

    return prisma.purchase.findMany({

      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    })
  }

  const deletePurchase =
async (id) => {

  const purchase =
    await prisma.purchase.findUnique({

      where: { id },

      include: {
        items: true,
      },

    });

  if (!purchase) {

    throw new Error(
      "Purchase not found"
    );

  }

  return prisma.$transaction(
    async (tx) => {

      // REVERSE STOCK

      for (
        const item of purchase.items
      ) {

        await tx.product.update({

          where: {
            id: item.productId,
          },

          data: {
            stock: {
              decrement:
                item.quantity,
            },
          },

        });

      }

      // DELETE ITEMS

      await tx.purchaseItem.deleteMany({

        where: {
          purchaseId: id,
        },

      });

      // DELETE PURCHASE

      return tx.purchase.delete({

        where: { id },

      });

    }
  );
};

module.exports = {
  createPurchase,
  getPurchases,
  deletePurchase,
}