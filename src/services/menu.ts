import axios from "axios";
import type { MenuItem } from "../types/menu";

const API_URL = "http://localhost:3000/api";

// ✅ Get all menu items
export const getMenuItems = async (): Promise<MenuItem[]> => {
  console.log("📥 Fetching menu items...");
  const response = await axios.get(`${API_URL}/menu-items`);
  return response.data;
};

// ✅ Create new menu item
export const createMenuItem = async (data: Partial<MenuItem>) => {
  console.log("📝 Creating menu item:", data);
  const response = await axios.post(`${API_URL}/menu-items`, data);
  return response.data;
};

// ✅ Update existing menu item
export const updateMenuItem = async (id: number, data: Partial<MenuItem>) => {
  console.log(`✏️ Updating menu item ID ${id}:`, data);
  const response = await axios.put(`${API_URL}/menu-items/${id}`, data);
  return response.data;
};

// ✅ Delete menu item
export const deleteMenuItem = async (id: number) => {
  console.log(`🗑️ Deleting menu item ID ${id}`);
  const response = await axios.delete(`${API_URL}/menu-items/${id}`);
  return response.data;
};
