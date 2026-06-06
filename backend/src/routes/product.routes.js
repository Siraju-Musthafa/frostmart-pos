const express = require("express")

const {
  create,
  getAll,
  remove,
  update
} = require("../controllers/product.controller")

const {
  protect,
  authorize,
} = require("../middleware/auth.middleware")

const router = express.Router()

router.post(
  "/",
  protect,
  authorize("ADMIN"),
  create
)

router.get("/", protect,authorize(
    "ADMIN",
    "STAFF"
  ), getAll)
router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  remove
);

router.put(
  "/:id",
  protect,
  authorize("ADMIN"),
  update
);

module.exports = router