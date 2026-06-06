require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { protect } = require("./middleware/auth.middleware");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const customerRoutes = require("./routes/customer.routes");
const billRoutes = require("./routes/bill.routes");
const ledgerRoutes = require("./routes/ledger.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const salesRoutes = require("./routes/sales.routes");
const supplierRoutes = require("./routes/supplier.routes");
const purchaseRoutes = require("./routes/purchase.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Frozen Store POS API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
