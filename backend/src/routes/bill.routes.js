const express = require("express")

const {
  create,remove,update
} = require("../controllers/bill.controller")

const { protect,authorize } =
  require("../middleware/auth.middleware")

const router = express.Router()

router.post("/", protect,authorize("ADMIN"), create);
router.delete("/:id", protect,authorize("ADMIN"), remove);
router.put("/:id", protect,authorize("ADMIN"), update);

module.exports = router