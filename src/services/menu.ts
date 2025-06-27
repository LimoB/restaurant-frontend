import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getMenuItems = async () => {
  const response = await axios.get(`${API_URL}/menu-items`);
  return response.data;
};

export const createMenuItem = async (data: any) => {
  const response = await axios.post(`${API_URL}/menu-items`, data);
  return response.data;
};

export const updateMenuItem = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/menu-items/${id}`, data);
  return response.data;
};

export const deleteMenuItem = async (id: number) => {
  const response = await axios.delete(`${API_URL}/menu-items/${id}`);
  return response.data;
};
