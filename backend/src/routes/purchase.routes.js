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
  protect,authorize
} = require(
  "../middleware/auth.middleware"
)

const router =
  express.Router()

router.post(
  "/",
  protect,
  create,authorize("ADMIN","STAFF")
)

router.get(
  "/",
  protect,
  allPurchases,
  authorize("ADMIN","STAFF")
)

router.delete(
  "/:id",
  protect,
  removePurchase,
  authorize("ADMIN","STAFF")
);

module.exports = router