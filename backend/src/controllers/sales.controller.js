const {
  getSales,
} = require("../services/sales.service")

const getAllSales =
  async (req, res) => {

    try {

      const page =
        Number(req.query.page) || 1

      const limit =
        Number(req.query.limit) || 10

      const search =req.query.search || ""
  

      const data =
        await getSales(
          page,
          limit,
          search
        )

      res.json({
        success: true,
        data,
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      })

    }
  }

module.exports = {
  getAllSales,
}