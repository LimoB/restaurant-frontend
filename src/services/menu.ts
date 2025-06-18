import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getMenuItems = async () => {
  const response = await axios.get(`${API_URL}/menu-items`);
  return response.data;
};
