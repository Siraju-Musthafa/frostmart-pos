const express =
  require("express")

const {
  create,
  allPurchases,
  removePurchase,
} = require(
  "../controllers/purchase.controller"
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
  allPurchases
)

router.delete(
  "/:id",
  protect,
  removePurchase
);

module.exports = router