const {
  collectPayment,
} = require("../services/ledger.service")

const payDue =
  async (req, res) => {

    try {

      const {
        customerId,
        amount,
      } = req.body

      await collectPayment(
        customerId,
        amount
      )

      res.json({
        success: true,
        message:
          "Payment collected",
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

module.exports = {
  payDue,
}