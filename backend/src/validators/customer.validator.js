const { z } = require("zod")

const createCustomerSchema = z.object({
  hotelName: z.string().min(2),

  ownerName: z.string().optional(),

  phone: z.string().min(10),

  address: z.string().optional(),

  creditLimit: z.number().optional(),
})

module.exports = {
  createCustomerSchema,
}