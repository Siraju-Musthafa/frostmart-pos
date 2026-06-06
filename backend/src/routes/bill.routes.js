const express = require("express")

const {
  create,remove,update
} = require("../controllers/bill.controller")

const { protect } =
  require("../middleware/auth.middleware")

const router = express.Router()

router.post("/", protect, create);
router.delete("/:id", protect, remove);
router.put("/:id", protect, update);

module.exports = router