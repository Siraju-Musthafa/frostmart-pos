const prisma = require("../config/prisma")

const createBill = async (data, userId) => {
  const {
    customerId,
    paymentMethod,
    taxAmount,
    discountAmount,
    paidAmount,
    items,
  } = data

  let subtotal = 0

  const billItemsData = []

  // PROCESS PRODUCTS
  for (const item of items) {
    const product =
      await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      })

    if (!product) {
      throw new Error("Product not found")
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `${product.name} out of stock`
      )
    }

    const itemSubtotal =
      product.sellingPrice * item.quantity

    subtotal += itemSubtotal

    billItemsData.push({
      productId: product.id,
      quantity: item.quantity,
      price: product.sellingPrice,
      subtotal: itemSubtotal,
    })
  }

  const totalAmount =
    subtotal + taxAmount - discountAmount

  const dueAmount =
    totalAmount - paidAmount

  const billNumber =
    `BILL-${Date.now()}`

  // TRANSACTION
  const result =
    await prisma.$transaction(async (tx) => {
      // CREATE BILL
      const bill = await tx.bill.create({
        data: {
          billNumber,
          customerId,
          subtotal,
          taxAmount,
          discountAmount,
          totalAmount,
          paidAmount,
          dueAmount,
          paymentMethod,
          createdById: userId,
        },
      })

      // CREATE BILL ITEMS
      for (const item of billItemsData) {
        await tx.billItem.create({
          data: {
            ...item,
            billId: bill.id,
          },
        })

        // REDUCE STOCK
        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        })
      }

      // CREDIT SALE
      if (
        customerId &&
        dueAmount > 0
      ) {
        await tx.ledger.create({
          data: {
            customerId,
            type: "PURCHASE",
            amount: dueAmount,
            description:
              `Due for bill ${billNumber}`,
          },
        })

        await tx.customer.update({
          where: {
            id: customerId,
          },
          data: {
            currentBalance: {
              increment: dueAmount,
            },
          },
        })
      }

      return bill
    })

  return result
}


const deleteBill = async (billId) => {

  const bill =
    await prisma.bill.findUnique({
      where: { id: billId },
      include: {
        items: true,
      },
    });

  if (!bill) {
    throw new Error("Bill not found");
  }

  await prisma.$transaction(async (tx) => {

    // Restore stock
    for (const item of bill.items) {

      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });

    }

    // Reverse customer due
    if (
      bill.customerId &&
      bill.dueAmount > 0
    ) {

      await tx.customer.update({
        where: {
          id: bill.customerId,
        },
        data: {
          currentBalance: {
            decrement: bill.dueAmount,
          },
        },
      });

      await tx.ledger.deleteMany({
        where: {
          customerId: bill.customerId,
          description: `Due for bill ${bill.billNumber}`,
        },
      });

    }

    // Delete bill items
    await tx.billItem.deleteMany({
      where: {
        billId: bill.id,
      },
    });

    // Delete bill
    await tx.bill.delete({
      where: {
        id: bill.id,
      },
    });

  });

  return {
    message: "Bill deleted successfully",
  };
};

const updateBill = async (
  billId,
  data
) => {

  const {
    paymentMethod,
    paidAmount,
  } = data;

  const bill =
    await prisma.bill.findUnique({
      where: {
        id: billId,
      },
    });

  if (!bill) {
    throw new Error(
      "Bill not found"
    );
  }

  const oldDue =
    bill.dueAmount;

  const newDue =
    bill.totalAmount -
    paidAmount;

  const result =
    await prisma.$transaction(
      async (tx) => {

        const updatedBill =
          await tx.bill.update({

            where: {
              id: billId,
            },

            data: {
              paymentMethod,
              paidAmount,
              dueAmount: newDue,
            },

          });

        // Update customer balance
        if (bill.customerId) {

          const difference =
            oldDue - newDue;

          await tx.customer.update({

            where: {
              id: bill.customerId,
            },

            data: {
              currentBalance: {
                decrement:
                  difference,
              },
            },

          });

        }

        return updatedBill;

      }
    );

  return result;
};


module.exports = {
  createBill,
  deleteBill,
  updateBill
}