import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import type { Category, CategoryInput } from "@/services/category";
// import React = require("react");

interface Props {
  open: boolean;
  initialData?: Category | null;
  onCancel: () => void;
  onSave: (data: CategoryInput) => void;
}

const CategoryFormModal = ({ open, initialData, onCancel, onSave }: Props) => {
  const [formData, setFormData] = useState<CategoryInput>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ name: initialData.name, description: initialData.description || "" });
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={open} onClose={onCancel} title={initialData ? "Edit Category" : "Add Category"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-white dark:border-slate-600"
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-white dark:border-slate-600"
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryFormModal;
