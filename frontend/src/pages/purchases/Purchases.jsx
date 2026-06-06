import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getProducts } from "../../services/product.service";

import { getSuppliers } from "../../services/supplier.service";

import { createPurchase, getPurchases,deletePurchase } from "../../services/purchase.service";
import { useRef } from "react";
import jsPDF from "jspdf";
import Swal from "sweetalert2";

export default function Purchases() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [items, setItems] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const purchaseRef = useRef();

  useEffect(() => {
    fetchProducts();

    fetchSuppliers();

    fetchPurchases();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const data = await getProducts();

    setProducts(data);
  };

  // FETCH SUPPLIERS
  const fetchSuppliers = async () => {
    const data = await getSuppliers();

    setSuppliers(data);
  };

  // FETCH PURCHASES
  const fetchPurchases = async () => {
    const data = await getPurchases();

    setPurchases(data);
  };

  // ADD PRODUCT ROW
  const addItem = () => {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
        purchasePrice: 0,
      },
    ]);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Purchase?",

      text: "Stock will be reduced.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deletePurchase(id);

      toast.success("Purchase deleted");

      fetchPurchases();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const downloadPDF = (purchase) => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Purchase Invoice", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Supplier: ${purchase.supplier.name}`, 20, 40);

    let y = 60;

    purchase.items.forEach((item) => {
      pdf.text(
        `${item.product.name} | Qty: ${item.quantity} | ₹${item.purchasePrice}`,
        20,
        y,
      );

      y += 10;
    });

    pdf.text(`Total: ₹${purchase.totalAmount}`, 20, y + 10);

    pdf.save(`purchase-${purchase.id}.pdf`);
  };

  // HANDLE ITEM CHANGE
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index][field] = value;

    setItems(updatedItems);
  };

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.supplier.name.toLowerCase().includes(search.toLowerCase()),
  );

  // CREATE PURCHASE
  const handleSubmit = async () => {
    try {
      if (!supplierId || items.length === 0) {
        return toast.error("Fill all fields");
      }

      await createPurchase({
        supplierId,
        items,
      });

      toast.success("Purchase created");

      setSupplierId("");

      setItems([]);

      fetchPurchases();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-2 md:p-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Purchases</h1>

      {/* FORM */}

      <div className="bg-white p-5 rounded-xl shadow mb-5">
        {/* SUPPLIER */}

        <select
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="">Select Supplier</option>

          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>

        {/* ITEMS */}

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-4
  "
            >
              {/* PRODUCT */}

              <select
                value={item.productId}
                onChange={(e) =>
                  handleItemChange(index, "productId", e.target.value)
                }
                className="border p-3 rounded"
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {/* QUANTITY */}

              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
                className="border p-3 rounded"
              />

              {/* PRICE */}

              <input
                type="number"
                placeholder="Purchase Price"
                value={item.purchasePrice}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "purchasePrice",
                    Number(e.target.value),
                  )
                }
                className="border p-3 rounded"
              />
            </div>
          ))}
        </div>

        {/* BUTTONS */}

        <div
          className="
    flex
    flex-col
    md:flex-row
    gap-3
    mt-5
  "
        >
          <button
            onClick={addItem}
            className="
    bg-blue-600
    text-white
    px-4
    py-3
    rounded
    w-full
    md:w-auto
  "
          >
            Add Product
          </button>

          <button
            onClick={handleSubmit}
            className="
    bg-black
    text-white
    px-4
    py-3
    rounded
    w-full
    md:w-auto
  "
          >
            Save Purchase
          </button>
        </div>
      </div>

      {/* PURCHASE HISTORY */}

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-5">Purchase History</h2>
        <input
          type="text"
          placeholder="Search Supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />
        {/* Desktop Table */}

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b h-12">
                <th>Supplier</th>

                <th>Total</th>

                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id} className="border-b h-12 text-center">
                  <td>{purchase.supplier.name}</td>

                  <td>₹{purchase.totalAmount}</td>

                  <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => setSelectedPurchase(purchase)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => downloadPDF(purchase)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={() => handleDelete(purchase.id)}
                      className="
      bg-red-600
      text-white
      px-3
      py-1
      rounded
    "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}

        <div className="md:hidden space-y-3">
          {filteredPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className="
          border
          rounded-lg
          p-4
        "
            >
              <p>
                <strong>Supplier:</strong> {purchase.supplier.name}
              </p>

              <p>
                <strong>Total:</strong> ₹{purchase.totalAmount}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(purchase.createdAt).toLocaleDateString()}
              </p>
              <p>
                <button
                  onClick={() => setSelectedPurchase(purchase)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => downloadPDF(purchase)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => handleDelete(purchase.id)}
                  className="
      bg-red-600
      text-white
      px-3
      py-1
      rounded
    "
                >
                  Delete
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
      {selectedPurchase && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div
            ref={purchaseRef}
            className="bg-white p-5 rounded-xl w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Purchase Details</h2>

            {selectedPurchase.items.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span>{item.product.name}</span>

                <span>
                  {item.quantity}× ₹{item.purchasePrice}
                </span>
              </div>
            ))}

            <button
              onClick={() => setSelectedPurchase(null)}
              className="bg-red-600 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
