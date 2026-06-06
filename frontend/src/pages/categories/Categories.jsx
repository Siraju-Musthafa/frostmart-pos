import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../services/category.service";

export default function Categories() {

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories =
  categories.filter(category =>
    category.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

  const fetchCategories =
    async () => {

      const data =
        await getCategories();

      setCategories(data);
    };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateCategory(editingId, { name });
        toast.success("Category updated");
        setEditingId(null);
        fetchCategories();
      } else {
        await createCategory({ name });
        toast.success("Category created");
        setName("");
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);

      toast.success("Category deleted");

      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="p-3 md:p-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Categories</h1>

      {/* CREATE FORM */}

      <div className="bg-white p-4 md:p-5 rounded-xl shadow mb-5">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Category" : "Create Category"}
        </button>
      </div>

      {/* TABLE */}

      <div className="bg-white p-5 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {filteredCategories.map((category) => (
            <div key={category.id} className="border rounded-lg p-3">
              <h3 className="font-semibold">{category.name}</h3>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    setEditingId(category.id);
                    setName(category.name);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b h-12">
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b h-12 text-center">
                  <td>{category.name}</td>

                  <td>
                    <button
                      onClick={() => {
                        setEditingId(category.id);
                        setName(category.name);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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