import { store } from "../store/store";
import type { BasicUser } from "../types/user";

const API_URL = "http://localhost:3000/api";

const getToken = () => store.getState().auth.token || "";

// Type for a Driver as returned from backend
export interface Driver {
  id: number;
  car_make?: string;
  car_model?: string;
  car_year?: string;
  license_plate?: string;
  user_id?: number;
  active?: boolean;
  name?: string; // Shortcut for displaying name (from user)
  user?: BasicUser; // Full user details, optional
  created_at?: string;
  updated_at?: string;
}

// 🌐 Fetch all drivers
export const fetchAllDrivers = async (): Promise<Driver[]> => {
  const res = await fetch(`${API_URL}/drivers`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch drivers");

  return await res.json();
};

// 🌐 Fetch a single driver by ID
export const fetchDriverById = async (id: number): Promise<Driver> => {
  const res = await fetch(`${API_URL}/driver/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch driver with ID ${id}`);

  return await res.json();
};

// 🌐 Fetch drivers by associated user ID
export const fetchDriversByUserId = async (userId: number): Promise<Driver[]> => {
  const res = await fetch(`${API_URL}/driver/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch drivers for user ${userId}`);

  return await res.json();
};

// ➕ Create a new driver
export const createDriver = async (data: Omit<Driver, "id" | "user">) => {
  const res = await fetch(`${API_URL}/driver`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create driver: ${error}`);
  }

  return await res.json(); // Expects: { message: "Driver Created Successfully 🚗" }
};

// ✏️ Update an existing driver
export const updateDriver = async (id: number, data: Partial<Omit<Driver, "id" | "user">>) => {
  const res = await fetch(`${API_URL}/driver/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update driver: ${error}`);
  }

  return await res.json(); // Expects: { message: "..." }
};

// ❌ Delete a driver
export const deleteDriver = async (id: number) => {
  const res = await fetch(`${API_URL}/driver/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to delete driver: ${error}`);
  }

  return await res.json(); // Expects: { message: "Driver deleted successfully" }
};
