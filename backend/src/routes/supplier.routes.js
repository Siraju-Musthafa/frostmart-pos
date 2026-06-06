const express =
  require("express")

const {
  create,
  allSuppliers,
} = require(
  "../controllers/supplier.controller"
)

const {
  protect,
} = require(
  "../middleware/auth.middleware"
)

const router =
  express.Router()

router.post(
  "/",
  protect,
  create
)

router.get(
  "/",
  protect,
  allSuppliers
)

module.exports = router