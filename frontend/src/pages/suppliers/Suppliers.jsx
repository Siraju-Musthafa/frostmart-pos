import {
  useEffect,
  useState,
} from "react"

import toast
from "react-hot-toast"

import {
  createSupplier,
  getSuppliers,
} from "../../services/supplier.service"

export default function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [formData,
    setFormData] =
    useState({
      name: "",
      phone: "",
      address: "",
    })

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const filteredSuppliers =
  suppliers.filter((supplier) =>
    supplier.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

  const fetchSuppliers =
    async () => {

      try {

        const data =
          await getSuppliers()

        setSuppliers(data)

      } catch (error) {

        console.log(error)
      }
    }

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      })
    }

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        await createSupplier(
          formData
        )

        toast.success(
          "Supplier added"
        )

        setFormData({
          name: "",
          phone: "",
          address: "",
        })

        fetchSuppliers()

      } catch (error) {

        toast.error(
          error.response.data.message
        )
      }
    }

  return (
    <div className="p-3 md:p-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Suppliers</h1>

      {/* FORM */}

      <div className="bg-white p-4 md:p-5 rounded-xl shadow">
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
            name="name"
            placeholder="Supplier Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
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
            Add Supplier
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-green-50 border rounded-lg p-4 mb-4">
        <h3 className="font-semibold">Total Suppliers</h3>

        <p className="text-2xl font-bold">{suppliers.length}</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />
        <div className="md:hidden space-y-3">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="border rounded-lg p-4">
              <h3 className="font-bold text-lg">{supplier.name}</h3>

              <p className="text-sm text-gray-600">📞 {supplier.phone}</p>

              <p className="text-sm text-gray-600">📍 {supplier.address}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b h-12">
                <th>Name</th>

                <th>Phone</th>

                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b h-12 text-center">
                  <td>{supplier.name}</td>

                  <td>{supplier.phone}</td>

                  <td>{supplier.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}