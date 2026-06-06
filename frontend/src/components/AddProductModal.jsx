import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import {
  createProduct,
  updateProduct
} from "../services/product.service"
import {
  getCategories} from "../services/category.service";

export default function AddProductModal({
  fetchProducts,
  selectedProduct,
  setSelectedProduct,
}) {
  
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] =
    useState({
      name: "",
      purchasePrice: "",
      sellingPrice: "",
      stock: "",
      minimumStock: "",
      brand: "",
      categoryId: "",
    })

    useEffect(() => {
  fetchCategories();

   if (
    selectedProduct
  ) {

    setFormData({
      name:
        selectedProduct.name,

      purchasePrice:
        selectedProduct.purchasePrice,

      sellingPrice:
        selectedProduct.sellingPrice,

      stock:
        selectedProduct.stock,

      minimumStock:
        selectedProduct.minimumStock,

      brand:
        selectedProduct.brand,

      categoryId:
        selectedProduct.categoryId || "",

    });

  }
}, [selectedProduct]);

    const fetchCategories =
  async () => {

    const data =
      await getCategories();

    setCategories(data);
};


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const payload = {

        ...formData,

        purchasePrice:
          Number(
            formData.purchasePrice
          ),

        sellingPrice:
          Number(
            formData.sellingPrice
          ),

        stock:
          Number(
            formData.stock
          ),

        minimumStock:
          Number(
            formData.minimumStock
          ),
      };

      if (
        selectedProduct
      ) {

        await updateProduct(
          selectedProduct.id,
          payload
        );
        fetchProducts();
        toast.success(
          "Product updated"
        );

      } else {

        await createProduct(
          payload
        );

        toast.success(
          "Product created"
        );
      }

      fetchProducts();

      setSelectedProduct(
        null
      );

      setFormData({
        name: "",
        purchasePrice: "",
        sellingPrice: "",
        stock: "",
        minimumStock: "",
        brand: "",
        categoryId: "",
      });

    } catch (error) {

      toast.error(
        error.response.data.message
      );

    }
};

  return (
    <div className="bg-white p-4 md:p-5 rounded-xl shadow mb-5">
      <h2 className="text-xl md:text-2xl font-bold mb-5">
        {selectedProduct ? "Edit Product" : "Add Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-3 rounded w-full"
          value={formData.name}
        />

        <input
          name="purchasePrice"
          placeholder="Purchase Price"
          onChange={handleChange}
          className="border p-3 rounded w-full"
          value={formData.purchasePrice}
        />

        <input
          name="sellingPrice"
          placeholder="Selling Price"
          onChange={handleChange}
          className="border p-3 rounded w-full"
          value={formData.sellingPrice}
        />

        <input
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="border p-3 rounded w-full"
          value={formData.stock}
        />

        <input
          name="minimumStock"
          placeholder="Minimum Stock"
          onChange={handleChange}
          className="border p-3 rounded w-full"
          value={formData.minimumStock}
        />

        <input
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="border p-3 rounded w-full"
          value={formData.brand}
        />

        <select
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({
              ...formData,
              categoryId: e.target.value,
            })
          }
          className="border p-3 rounded w-full"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="
    bg-black
    text-white
    p-3
    rounded
    w-full
    md:w-auto
  "
        >
          {selectedProduct ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}