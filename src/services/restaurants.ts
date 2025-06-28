import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Utility for authentication headers
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Types
export interface Restaurant {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  owner?: { id: number; name: string };
  address?: { city?: { id: number; name: string } };
}

export interface RestaurantInput {
  name: string;
  description?: string;
  ownerId: number;
  cityId: number;
}

// ✅ Fetch all restaurants
export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  console.log("📦 Fetching all restaurants...");
  const res = await axios.get(`${API_URL}/restaurants`, {
    headers: authHeader(),
  });
  return res.data;
};

// ✅ Fetch a single restaurant by ID
export const fetchRestaurantById = async (id: number): Promise<Restaurant> => {
  console.log(`📦 Fetching restaurant ID ${id}`);
  const res = await axios.get(`${API_URL}/restaurants/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};

// ✅ Create a new restaurant
export const createRestaurant = async (
  restaurantData: RestaurantInput
): Promise<Restaurant> => {
  console.log("📝 Creating new restaurant:", restaurantData);
  const res = await axios.post(`${API_URL}/restaurants`, restaurantData, {
    headers: authHeader(),
  });
  return res.data;
};

// ✅ Update existing restaurant
export const updateRestaurant = async (
  id: number,
  restaurantData: RestaurantInput
): Promise<Restaurant> => {
  console.log(`✏️ Updating restaurant ID ${id}:`, restaurantData);
  const res = await axios.put(`${API_URL}/restaurants/${id}`, restaurantData, {
    headers: authHeader(),
  });
  return res.data;
};

// ✅ Delete a restaurant
export const deleteRestaurant = async (id: number): Promise<{ message: string }> => {
  console.log(`🗑️ Deleting restaurant ID ${id}`);
  const res = await axios.delete(`${API_URL}/restaurants/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};

// ✅ Fetch restaurants by city ID
export const fetchRestaurantsByCity = async (
  cityId: number
): Promise<Restaurant[]> => {
  console.log(`🏙️ Fetching restaurants in city ID ${cityId}`);
  const res = await axios.get(`${API_URL}/cities/${cityId}/restaurants`, {
    headers: authHeader(),
  });
  return res.data;
};
