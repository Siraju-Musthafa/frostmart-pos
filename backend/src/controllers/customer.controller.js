const {
  createCustomer,
  getCustomers,
} = require("../services/customer.service")

const {
  createCustomerSchema,
} = require("../validators/customer.validator")

const create = async (req, res) => {
  try {
    const validatedData =
      createCustomerSchema.parse(req.body)

    const customer =
      await createCustomer(validatedData)

    res.status(201).json({
      success: true,
      data: customer,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const getAll = async (req, res) => {
  try {
    const customers =
      await getCustomers()

    res.json({
      success: true,
      data: customers,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  create,
  getAll,
}