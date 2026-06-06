const express = require("express")

const {
  create,
  getAll,
} = require("../controllers/customer.controller")

const { protect } =
  require("../middleware/auth.middleware")

const router = express.Router()

router.post("/", protect, create)

router.get("/", protect, getAll)

module.exports = router