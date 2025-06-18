import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Optional utility for headers
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Type Definitions
export interface Restaurant {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  // Add more fields as needed
}

export interface RestaurantInput {
  name: string;
  description?: string;
  // Include other fields required for creation/updating
}

// Fetch all restaurants
export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const res = await axios.get(`${API_URL}/restaurants`, {
    headers: authHeader(),
  });
  return res.data;
};

// Fetch a single restaurant by ID
export const fetchRestaurantById = async (id: number): Promise<Restaurant> => {
  const res = await axios.get(`${API_URL}/restaurants/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};

// Create a new restaurant
export const createRestaurant = async (
  restaurantData: RestaurantInput
): Promise<Restaurant> => {
  const res = await axios.post(`${API_URL}/restaurants`, restaurantData, {
    headers: authHeader(),
  });
  return res.data;
};

// Update an existing restaurant
export const updateRestaurant = async (
  id: number,
  restaurantData: RestaurantInput
): Promise<Restaurant> => {
  const res = await axios.put(`${API_URL}/restaurants/${id}`, restaurantData, {
    headers: authHeader(),
  });
  return res.data;
};

// Delete a restaurant
export const deleteRestaurant = async (id: number): Promise<{ message: string }> => {
  const res = await axios.delete(`${API_URL}/restaurants/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};

// Optional: Fetch restaurants by city
export const fetchRestaurantsByCity = async (cityId: number): Promise<Restaurant[]> => {
  const res = await axios.get(`${API_URL}/cities/${cityId}/restaurants`, {
    headers: authHeader(),
  });
  return res.data;
};
