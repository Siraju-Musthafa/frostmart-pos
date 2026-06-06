const {
  createSupplier,
  getSuppliers,
} = require(
  "../services/supplier.service"
)

// CREATE
const create =
  async (req, res) => {

    try {

      const supplier =
        await createSupplier(
          req.body
        )

      res.status(201).json({
        success: true,
        data: supplier,
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

// GET ALL
const allSuppliers =
  async (req, res) => {

    try {

      const suppliers =
        await getSuppliers()

      res.json({
        success: true,
        data: suppliers,
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
  allSuppliers,
}