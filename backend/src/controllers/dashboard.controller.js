const {
  getStats,getMonthlySales
} = require(
  "../services/dashboard.service"
)

const stats =
  async (req, res) => {

    try {

      const data =
        await getStats()

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

  const monthlySales =
  async (req, res) => {

    try {

      const data =
        await getMonthlySales()

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
  stats,
  monthlySales,
}