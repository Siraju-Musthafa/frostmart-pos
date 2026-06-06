const prisma = require("../config/prisma")

const collectPayment =
  async (customerId, amount) => {

    return prisma.$transaction(
      async (tx) => {

        // CREATE PAYMENT ENTRY
        await tx.ledger.create({
          data: {
            customerId,
            type: "PAYMENT",
            amount,
            description:
              "Due payment collected",
          },
        })

        // REDUCE CUSTOMER BALANCE
        await tx.customer.update({
          where: {
            id: customerId,
          },
          data: {
            currentBalance: {
              decrement: amount,
            },
          },
        })
      }
    )
  }

module.exports = {
  collectPayment,
}