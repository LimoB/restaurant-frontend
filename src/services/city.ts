import axios from "axios";
const API_URL = "http://localhost:3000/api";

export const fetchCities = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/cities`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
