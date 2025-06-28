import axios from "axios";

const API_URL = "http://localhost:3000/api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Fetch all cities
export const fetchCities = async () => {
  const res = await axios.get(`${API_URL}/city`, authHeader());
  return res.data;
};

// Fetch city by ID
export const fetchCityById = async (id: number) => {
  const res = await axios.get(`${API_URL}/city/${id}`, authHeader());
  return res.data;
};

// Create a new city
export const createCity = async (cityData: { name: string; stateId: number }) => {
  const res = await axios.post(`${API_URL}/city`, cityData, authHeader());
  return res.data;
};

// Update existing city
export const updateCity = async (
  id: number,
  cityData: { name: string; stateId: number }
) => {
  const res = await axios.put(`${API_URL}/city/${id}`, cityData, authHeader());
  return res.data;
};

// Delete a city
export const deleteCity = async (id: number) => {
  const res = await axios.delete(`${API_URL}/city/${id}`, authHeader());
  return res.data;
};
