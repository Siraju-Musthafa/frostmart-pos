const express = require("express");

const { payDue } = require("../controllers/ledger.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/payment", protect, payDue);

module.exports = router;
