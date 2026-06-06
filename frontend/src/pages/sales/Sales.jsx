import { useEffect, useState } from "react";
import { getSales } from "../../services/sales.service";
import SalesInvoice from "../../components/SalesInvoice";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import {
  deleteSale,updateBill
} from "../../services/sales.service";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const invoiceRef = useRef();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editBill, setEditBill] = useState(null);
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  useEffect(() => {
    fetchSales();
  }, [page, search]);

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
  });

  const filteredSales = sales.filter((bill) =>
    (bill.customer?.hotelName || "Walk-in")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    try {
      await deleteSale(id);

      toast.success("Bill deleted");

      fetchSales();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const downloadPDF = async () => {
    const element = invoiceRef.current;

    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    pdf.addImage(data, "PNG", 10, 10, 180, 0);

    pdf.save(`${selectedBill.billNumber}.pdf`);
  };

  const fetchSales = async () => {
    try {
      const data = await getSales(page, search);

      setSales(data.sales);

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (bill) => {
    setEditBill(bill);

    setPaidAmount(bill.paidAmount);

    setPaymentMethod(bill.paymentMethod);
  };

  const handleUpdateBill = async () => {
    try {
      await updateBill(editBill.id, {
        paymentMethod,
        paidAmount: Number(paidAmount),
      });

      toast.success("Bill updated");

      setEditBill(null);

      fetchSales();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Sales History</h1>

      <div className="bg-white p-4 md:p-5 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full border p-3 rounded mb-5"
        />
        <div className="md:hidden space-y-3">
          {filteredSales.map((bill) => (
            <div key={bill.id} className="border rounded-lg p-4">
              <h3 className="font-bold">{bill.billNumber}</h3>

              <p>Customer: {bill.customer?.hotelName || "Walk-in"}</p>

              <p>Amount: ₹{bill.totalAmount}</p>

              <p>Payment: {bill.paymentMethod}</p>

              <p>Date: {new Date(bill.createdAt).toLocaleDateString()}</p>

              <button
                onClick={() => setSelectedBill(bill)}
                className="
          mt-3
          bg-blue-500
          text-white
          px-4
          py-2
          rounded
          w-full
        "
              >
                View Invoice
              </button>
              <button
                onClick={() => handleDelete(bill.id)}
                className="
    mt-2
    bg-red-500
    text-white
    px-4
    py-2
    rounded
    w-full
  "
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(bill)}
                className="
    mt-2
    bg-yellow-500
    text-white
    px-4
    py-2
    rounded
    w-full
  "
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b h-12">
                <th>Bill No</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSales.map((bill) => (
                <tr key={bill.id} className="border-b text-center h-12">
                  <td>{bill.billNumber}</td>

                  <td>{bill.customer?.hotelName || "Walk-in"}</td>

                  <td>₹{bill.totalAmount}</td>

                  <td>{bill.paymentMethod}</td>

                  <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(bill.id)}
                        className="
    bg-red-500
    text-white
    px-3
    py-1
    rounded
  "
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(bill)}
                        className="
    bg-yellow-500
    text-white
    px-3
    py-1
    rounded
  "
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="
    flex
    flex-col
    md:flex-row
    justify-center
    items-center
    gap-3
    mt-5
  "
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
  bg-gray-200
  px-4
  py-2
  rounded
  w-full
  md:w-auto
"
          >
            Previous
          </button>

          <span className="font-bold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="
  bg-gray-200
  px-4
  py-2
  rounded
  w-full
  md:w-auto
"
          >
            Next
          </button>
        </div>
      </div>
      {selectedBill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div
            className="
    bg-white
    p-4
    md:p-5
    rounded-lg
    w-[95%]
    md:w-auto
    max-h-[90vh]
    overflow-y-auto
  "
          >
            <SalesInvoice ref={invoiceRef} bill={selectedBill} />

            <div
              className="
    flex
    flex-col
    md:flex-row
    gap-3
    mt-4
  "
            >
              <button
                onClick={handlePrint}
                className="bg-green-600 text-white px-4 py-2 rounded  w-full"
              >
                Print
              </button>

              <button
                onClick={downloadPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded  w-full"
              >
                PDF
              </button>

              <button
                onClick={() => setSelectedBill(null)}
                className="bg-red-600 text-white px-4 py-2 rounded  w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {editBill && (
        <div
          className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
    "
        >
          <div
            className="
        bg-white
        p-5
        rounded-lg
        w-[90%]
        md:w-[400px]
      "
          >
            <h2
              className="
          text-xl
          font-bold
          mb-4
        "
            >
              Update Bill
            </h2>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="
          w-full
          border
          p-3
          rounded
          mb-3
        "
            >
              <option value="CASH">Cash</option>

              <option value="UPI">UPI</option>

              <option value="CARD">Card</option>

              <option value="CREDIT">Credit</option>
            </select>

            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              placeholder="Paid Amount"
              className="
          w-full
          border
          p-3
          rounded
          mb-4
        "
            />

            <div
              className="
          flex
          gap-3
        "
            >
              <button
                onClick={handleUpdateBill}
                className="
            flex-1
            bg-green-600
            text-white
            py-2
            rounded
          "
              >
                Save
              </button>

              <button
                onClick={() => setEditBill(null)}
                className="
            flex-1
            bg-red-600
            text-white
            py-2
            rounded
          "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
