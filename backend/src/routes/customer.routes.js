const express = require("express")

const {
  create,
  getAll,
} = require("../controllers/customer.controller")

const { protect } =
  require("../middleware/auth.middleware")

const router = express.Router()

router.post("/", protect, create,authorize("ADMIN","STAFF"))

router.get("/", protect, getAll,authorize("ADMIN","STAFF"))

module.exports = router