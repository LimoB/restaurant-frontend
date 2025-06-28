import axios from "axios";

// Adjust if needed (you might want to use import.meta.env.VITE_API_URL)
const API_URL = "http://localhost:3000/api";

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryInput {
  name: string;
  description?: string;
}

// ✅ Get all categories
export const fetchCategories = async (): Promise<Category[]> => {
  console.log("📦 Fetching categories...");
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};

// ✅ Get single category by ID
export const fetchCategoryById = async (id: number): Promise<Category> => {
  console.log(`📦 Fetching category ID ${id}...`);
  const res = await axios.get(`${API_URL}/categories/${id}`);
  return res.data;
};

// ✅ Get category with menu items
export const fetchCategoryWithMenuItems = async (id: number) => {
  console.log(`📦 Fetching category ${id} with menu items...`);
  const res = await axios.get(`${API_URL}/categories/${id}/menu-items`);
  return res.data;
};

// ✅ Create a new category
export const createCategory = async (data: CategoryInput): Promise<Category> => {
  console.log("📝 Creating category:", data);
  const res = await axios.post(`${API_URL}/categories`, data);
  return res.data;
};

// ✅ Update a category
export const updateCategory = async (id: number, data: CategoryInput): Promise<Category> => {
  console.log(`✏️ Updating category ID ${id}:`, data);
  const res = await axios.put(`${API_URL}/categories/${id}`, data);
  return res.data;
};

// ✅ Delete a category
export const deleteCategory = async (id: number): Promise<{ message: string }> => {
  console.log(`🗑️ Deleting category ID ${id}`);
  const res = await axios.delete(`${API_URL}/categories/${id}`);
  return res.data;
};
