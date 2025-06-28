import { Button } from "../../components/ui/button";
import { useState } from "react";
import axios from "axios";
import type { MenuFormProps } from "../../types/types";

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

  console.log("🌍 Cloudinary Config:");
  console.log("🔐 VITE_CLOUDINARY_CLOUD_NAME:", cloudName);
  console.log("🧪 VITE_CLOUDINARY_UPLOAD_PRESET:", uploadPreset);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.warn("⚠️ No file selected");
      return;
    }

    setUploading(true);
    console.log("📤 Uploading file:", file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const url = res.data.secure_url;
      console.log("✅ Image uploaded successfully:", url);
      onChange("image_url", url);
    } catch (err) {
      console.error("❌ Cloudinary upload failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🧾 Submitting form data:");
    console.log("📝 name:", form.name);
    console.log("💰 price:", form.price);
    console.log("🍴 ingredients:", form.ingredients);
    console.log("🖼️ image_url:", form.image_url);
    console.log("📁 category_id:", form.category_id);
    console.log("🏬 restaurant_id:", form.restaurant_id);
    console.log("✅ active:", form.active);

    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        required
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={(e) => onChange("price", e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Ingredients"
        value={form.ingredients}
        onChange={(e) => onChange("ingredients", e.target.value)}
        className="w-full p-2 border rounded"
      />

      {/* Restaurant Select */}
      <select
        required
        value={form.restaurant_id}
        onChange={(e) => onChange("restaurant_id", Number(e.target.value))}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Select Restaurant --</option>
        {restaurants.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      {/* Category Select */}
      <select
        required
        value={form.category_id}
        onChange={(e) => onChange("category_id", Number(e.target.value))}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Select Category --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Active Toggle */}
      <select
        value={form.active ? "true" : "false"}
        onChange={(e) => onChange("active", e.target.value === "true")}
        className="w-full p-2 border rounded"
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
      {form.image_url && (
        <img
          src={form.image_url}
          alt="Preview"
          className="w-24 h-24 object-cover rounded"
        />
      )}

      <div className="flex justify-end gap-2">
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
