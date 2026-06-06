import { useEffect, useState } from "react";

import { getProducts } from "../../services/product.service";
import toast from "react-hot-toast";
import { createBill } from "../../services/bill.service";
import { getCustomers } from "../../services/customer.service";
import { useNavigate } from "react-router-dom";

export default function POS() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);


  const filteredProducts =
  products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );


  const fetchCustomers = async () => {
    const data = await getCustomers();

    setCustomers(data);
  };

  const fetchProducts = async () => {
    const data = await getProducts();

    setProducts(data);
  };

  const handleCreateBill = async () => {
    try {

        if (!selectedCustomer) {
      return toast.error(
        "Please select a customer"
      );
    }

    if (cart.length === 0) {
      return toast.error(
        "Cart is empty"
      );
    }

      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const billData = {
        customerId: selectedCustomer || undefined,
        paymentMethod,
        taxAmount: 0,
        discountAmount: 0,
        paidAmount: paymentMethod === "CREDIT" ? 0 : total,
        items,
      };

      await createBill(billData);

      toast.success("Bill created successfully");

      setCart([]);
      navigate("/sales");

      fetchProducts();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // ADD TO CART
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQty = (id) => {
  setCart(
    cart.map(item =>
      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity + 1,
          }
        : item
    )
  );
};

const decreaseQty = (id) => {
  setCart(
    cart
      .map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
          : item
      )
      .filter(
        item =>
          item.quantity > 0
      )
  );
};

const removeItem = (id) => {
  setCart(
    cart.filter(
      item =>
        item.id !== id
    )
  );
};

  // TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.sellingPrice,
    0,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* PRODUCTS */}

      <div className="lg:col-span-2 bg-white p-4 md:p-5 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-5">POS Billing</h1>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="
border
p-3
rounded-lg
cursor-pointer
hover:bg-gray-100
transition
"
            >
              <h2 className="font-bold text-sm md:text-base">{product.name}</h2>

              <p className="text-sm">₹{product.sellingPrice}</p>

              <p className="text-xs text-gray-500">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}

      <div className="bg-white p-4 md:p-5 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-5">Cart</h2>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.hotelName}
            </option>
          ))}
        </select>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="CASH">Cash</option>

          <option value="UPI">UPI</option>

          <option value="CARD">Card</option>

          <option value="CREDIT">Credit</option>
        </select>

        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="border-b pb-2">
              <h3>{item.name}</h3>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  -
                </button>

                <span className="font-bold">{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t pt-4">
          <h2 className="text-xl md:text-2xl font-bold">₹{total}</h2>
        </div>

        <button
          onClick={handleCreateBill}
          className="
    w-full
    bg-black
    text-white
    p-3
    rounded
    mt-5
    hover:bg-gray-800
    transition
  "
        >
          Create Bill
        </button>
      </div>
    </div>
  );
}
