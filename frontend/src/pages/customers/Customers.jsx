import {
  useEffect,
  useState,
} from "react"

import toast
from "react-hot-toast"

import {
  createCustomer,
} from "../../services/customer.service"
import {
  getCustomers,
} from "../../services/customer.service"

export default function Customers() {

  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    hotelName: "",
    phone: "",
    address: "",
  });
  const [search, setSearch] =useState("");

  useEffect(() => {
    fetchCustomers()
  }, [])
 

   const filteredCustomers =
  customers.filter((customer) =>
    customer.hotelName
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

   const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value,
     });
   };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // HOTEL NAME VALIDATION
  if (!formData.hotelName.trim()) {
    return toast.error("Hotel name is required");
  }

  // PHONE VALIDATION
  if (!formData.phone.trim()) {
    return toast.error("Phone number is required");
  }

  if (formData.phone.length < 10) {
    return toast.error(
      "Phone number must be at least 10 digits"
    );
  }

  try {
    await createCustomer(formData);

    toast.success("Customer created");

    setFormData({
      hotelName: "",
      phone: "",
      address: "",
    });

    fetchCustomers();

  } catch (error) {

    toast.error(
      error?.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  const fetchCustomers =
    async () => {

      try {

        const data =
          await getCustomers()

        setCustomers(data)

      } catch (error) {

        console.log(error)
      }
    }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Customers</h1>

      <div className="bg-white p-5 rounded-xl shadow mb-5">
        <h2 className="text-xl md:text-2xl font-bold mb-5">Add Customer</h2>

        <form
          onSubmit={handleSubmit}
          className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-4
  "
        >
          <input
            name="hotelName"
            placeholder="Hotel Name"
            value={formData.hotelName}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <button
            className="
    bg-black
    text-white
    p-3
    rounded
    w-full
    md:w-auto
  "
          >
            Add Customer
          </button>
        </form>
      </div>

      <div className="bg-blue-50 border rounded-lg p-4 mb-4">
        <h3 className="font-semibold">Total Customers</h3>

        <p className="text-2xl font-bold">{customers.length}</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />
        <div className="md:hidden space-y-3">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="border rounded-lg p-4">
              <h3 className="font-bold text-lg">{customer.hotelName}</h3>

              <p className="text-sm text-gray-600">📞 {customer.phone}</p>

              <p className="text-sm text-gray-600">📍 {customer.address}</p>

              <p className="font-semibold mt-2">
                Balance: ₹{customer.currentBalance}
              </p>
            </div>
          ))}
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b h-12">
                <th>Hotel Name</th>

                <th>Phone</th>

                <th>Address</th>

                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b h-12 text-center">
                  <td>{customer.hotelName}</td>

                  <td>{customer.phone}</td>

                  <td>{customer.address}</td>

                  <td>₹{customer.currentBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}