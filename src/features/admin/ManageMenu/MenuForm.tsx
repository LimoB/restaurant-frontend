import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import type { MenuFormProps } from "@/types/types";
// import React = require("react");

interface Restaurant {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface ExtendedMenuFormProps extends MenuFormProps {
  restaurants: Restaurant[];
  categories: Category[];
}

export default function MenuForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
  restaurants,
  categories,
}: ExtendedMenuFormProps) {
  const [uploading, setUploading] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      onChange("image_url", res.data.secure_url);
    } catch (err) {
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 text-gray-800 dark:text-gray-100">
      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full p-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
      />

      <input
        required
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={(e) => onChange("price", e.target.value)}
        className="w-full p-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
      />

      <textarea
        placeholder="Ingredients"
        value={form.ingredients}
        onChange={(e) => onChange("ingredients", e.target.value)}
        className="w-full p-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
      />

      <select
        required
        value={form.restaurant_id}
        onChange={(e) => onChange("restaurant_id", Number(e.target.value))}
        className="w-full p-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
      >
        <option value="">-- Select Restaurant --</option>
        {restaurants.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <select
        required
        value={form.category_id}
        onChange={(e) => onChange("category_id", Number(e.target.value))}
        className="w-full p-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
      >
        <option value="">-- Select Category --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={form.active ? "true" : "false"}
        onChange={(e) => onChange("active", e.target.value === "true")}
        className="w-full p-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
      />

      {uploading && <p className="text-sm text-gray-500 dark:text-gray-400">Uploading image...</p>}

      {form.image_url && (
        <img
          src={form.image_url}
          alt="Preview"
          className="w-24 h-24 object-cover rounded border dark:border-slate-600"
        />
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={uploading}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
