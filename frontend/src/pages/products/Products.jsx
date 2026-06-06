import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { getProducts, deleteProduct } from "../../services/product.service";
import AddProductModal from "../../components/AddProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-gray-500">Total Products: {products.length}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <AddProductModal
          fetchProducts={fetchProducts}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />

        <div className="mb-5">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border p-3 rounded-lg"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td>{product.name}</td>

                    <td>₹{product.sellingPrice}</td>

                    <td>
                      {product.stock > 20 ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          {product.stock}
                        </span>
                      ) : product.stock > 0 ? (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          {product.stock}
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {product.category?.name || "No Category"}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
