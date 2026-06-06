const express =
  require("express")

const {
  stats,
} = require(
  "../controllers/dashboard.controller"
)

const {
  protect,
} = require(
  "../middleware/auth.middleware"
)
const  {monthlySales}=require('../controllers/dashboard.controller')

const router =
  express.Router()

router.get(
  "/stats",
  protect,
  stats
)

router.get(
  "/monthly-sales",
  protect,
  monthlySales
)

module.exports = router