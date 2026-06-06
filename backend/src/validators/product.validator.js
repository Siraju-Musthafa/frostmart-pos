const { z } = require("zod")

const createProductSchema = z.object({
  name: z.string().min(2),

  purchasePrice: z.number(),

  sellingPrice: z.number(),

  stock: z.number(),

  minimumStock: z.number(),

  categoryId: z.string().optional(),

  barcode: z.string().optional(),

  brand: z.string().optional(),
})

module.exports = {
  createProductSchema,
}