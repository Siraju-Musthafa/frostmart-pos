import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import DashboardLayout from "./layouts/DashboardLayout"
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import Products from "./pages/products/Products"
import Customers from "./pages/customers/Customers"
import ProtectedRoute from "./routes/ProtectedRoute"
import POS from "./pages/billing/POS"
import { Toaster } from "react-hot-toast"
import Sales from "./pages/sales/Sales"
import Ledger from "./pages/ledger/Ledger"
import Suppliers from "./pages/suppliers/Suppliers";
import Purchases from "./pages/purchases/Purchases";
import Categories  from "./pages/categories/Categories";


function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />

          <Route path="/customers" element={<Customers />} />

          <Route path="/billing" element={<POS />} />

          <Route path="/ledger" element={<Ledger />} />

          <Route path="/sales" element={<Sales />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App