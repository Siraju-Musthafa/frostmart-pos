const { z } = require("zod")

const billItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
})

const createBillSchema = z.object({
  customerId: z.string().optional(),

  paymentMethod: z.string(),

  taxAmount: z.number().default(0),

  discountAmount: z.number().default(0),

  paidAmount: z.number(),

  items: z.array(billItemSchema),
})

module.exports = {
  createBillSchema,
}