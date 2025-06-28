import { useEffect, useState } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
  type CategoryInput,
} from "../../services/category";
import CategoryFormModal from "./CategoryFormModal";
import { Button } from "../../components/ui/button";
import { toast } from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtered, setFiltered] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    try {
      const data = await fetchCategories();
      console.log("✅ Loaded categories from API:", data); // Debug log
      setCategories(data);
      setFiltered(data);
    } catch (err) {
      toast.error("Failed to fetch categories");
      console.error("❌ Error loading categories:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const result = categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(lower) ||
        (cat.description?.toLowerCase().includes(lower) ?? false)
    );
    setFiltered(result);
    setPage(1);
  }, [search, categories]);

  const handleSave = async (input: CategoryInput) => {
    try {
      if (selected) {
        await updateCategory(selected.id, input);
        toast.success("Category updated");
      } else {
        await createCategory(input);
        toast.success("Category created");
      }
      setFormOpen(false);
      setSelected(null);
      load();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  const pageData = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">📂 Manage Categories</h1>
        <Button
          onClick={() => {
            setSelected(null);
            setFormOpen(true);
          }}
          variant="primary"
          size="md"
        >
          + Add Category
        </Button>
      </div>

      <input
        type="text"
        placeholder="Search by name or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm"
      />

      <CategoryFormModal
        open={formOpen}
        initialData={selected}
        onCancel={() => setFormOpen(false)}
        onSave={handleSave}
      />

      {pageData.length === 0 ? (
        <p className="text-gray-500 italic mt-6">No categories found.</p>
      ) : (
        <table className="w-full table-auto border mt-4 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((cat) => {
              console.log(`🔍 Rendering category ${cat.id}:`, cat); // Debug each row
              return (
                <tr key={cat.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{cat.id}</td>
                  <td className="p-2">{cat.name}</td>
                  <td className="p-2">
                    {typeof cat.description === "string" && cat.description.trim()
                      ? cat.description
                      : <em className="text-gray-400">No description</em>}
                  </td>
                  <td className="p-2 space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelected(cat);
                        setFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
