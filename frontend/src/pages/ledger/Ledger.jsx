import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getCustomers } from "../../services/customer.service";

import api from "../../api/axios";

export default function Ledger() {
  const [customers, setCustomers] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();

      setCustomers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // COLLECT PAYMENT
  const handlePayment = async () => {
    try {
      if (!selectedCustomer || !amount) {
        return toast.error("Fill all fields");
      }

      await api.post("/ledger/payment", {
        customerId: selectedCustomer,
        amount: Number(amount),
      });

      toast.success("Payment collected");

      setAmount("");

      fetchCustomers();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const customer = customers.find((c) => c.id === selectedCustomer);

  return (
    <div className="p-2 md:p-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Customer Ledger</h1>

      <div
        className="
    bg-white
    p-4
    md:p-5
    rounded-xl
    shadow
    w-full
    max-w-lg
  "
      >
        {/* CUSTOMER */}

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

        {/* CURRENT BALANCE */}

        {customer && (
          <div
            className="
    mb-4
    bg-red-100
    border
    border-red-200
    p-4
    rounded-lg
  "
          >
            <h2 className="font-bold">Current Due</h2>

            <p className="text-xl md:text-2xl font-bold text-red-600">
              ₹{customer.currentBalance}
            </p>
          </div>
        )}

        {/* PAYMENT INPUT */}

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="
  w-full
  border
  p-3
  rounded
  mb-4
  text-sm
  md:text-base
"
        />

        {/* BUTTON */}

        <button
          onClick={handlePayment}
          className="
  w-full
  bg-black
  text-white
  p-3
  rounded
  hover:bg-gray-800
  transition
"
        >
          Collect Payment
        </button>
      </div>
      {customer && (
        <div className="bg-gray-50 p-4 rounded mb-4">
          <p>
            <strong>Hotel:</strong> {customer.hotelName}
          </p>

          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>

          <p>
            <strong>Address:</strong> {customer.address}
          </p>
        </div>
      )}
    </div>
  );
}
