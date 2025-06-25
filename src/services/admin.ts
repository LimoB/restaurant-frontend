import axios from "axios";

const API = "http://localhost:3000/api"; // Change if needed (like /api prefix)

export const fetchUsers = () => axios.get(`${API}/admin/users`);
export const fetchRestaurants = () => axios.get(`${API}/admin/restaurants`);
export const fetchOrders = () => axios.get(`${API}/admin/orders`);
export const fetchDashboardSummary = () => axios.get(`${API}/admin/dashboard/summary`);

// ✅ Corrected fetchDrivers path
export const fetchDrivers = () => axios.get(`${API}/drivers`);
