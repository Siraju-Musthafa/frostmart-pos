const express =
  require("express")

const {
  getAllSales
} = require(
  "../controllers/sales.controller"
)

const {
  protect,authorize
} = require(
  "../middleware/auth.middleware"
)

const router =
  express.Router()

router.get(
  "/",
  protect,
  getAllSales,
  authorize("ADMIN","STAFF")
)

module.exports = router