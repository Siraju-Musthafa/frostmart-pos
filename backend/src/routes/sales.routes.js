const express =
  require("express")

const {
  getAllSales
} = require(
  "../controllers/sales.controller"
)

const {
  protect,
} = require(
  "../middleware/auth.middleware"
)

const router =
  express.Router()

router.get(
  "/",
  protect,
  getAllSales
)

module.exports = router