const express = require("express")

const {
  create,
  getAll,
  update,
  remove,
} = require("../controllers/category.controller")

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

router.get("/", protect,authorize("ADMIN","STAFF"), getAll)

router.put("/:id",protect,update,authorize("ADMIN","STAFF"));
router.delete("/:id",protect,remove,authorize("ADMIN","STAFF"));

module.exports = router