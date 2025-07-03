import { store } from "@/store/store";

// ✅ Use Vite-specific env variable prefix
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Get auth token from Redux store
const getToken = () => store.getState().auth.token || "";

// Address interface matching backend schema
export interface Address {
  id?: number;
  street_address_1: string;
  street_address_2?: string;
  zip_code: string;
  delivery_instructions?: string;
  city_id: number;
  created_at?: string;
  updated_at?: string;
}

// Reusable fetch wrapper with auth and error handling
const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    let error;
    try {
      error = await res.json();
    } catch {
      error = { error: await res.text() };
    }
    throw new Error(error?.error || "Request failed");
  }

  return res;
};

// Fetch all addresses
export const fetchAllAddresses = async (): Promise<Address[]> => {
  const res = await fetchWithAuth("/address");
  return await res.json();
};

// Fetch a single address by ID
export const fetchAddressById = async (id: number): Promise<Address> => {
  const res = await fetchWithAuth(`/address/${id}`);
  return await res.json();
};

// Create a new address
export const createAddress = async (
  address: Omit<Address, "id" | "created_at" | "updated_at">
): Promise<Address> => {
  const res = await fetchWithAuth("/address", {
    method: "POST",
    body: JSON.stringify(address),
  });
  return await res.json();
};

// Update an existing address
export const updateAddress = async (
  id: number,
  address: Partial<Omit<Address, "id" | "created_at" | "updated_at">>
): Promise<Address> => {
  const res = await fetchWithAuth(`/address/${id}`, {
    method: "PUT",
    body: JSON.stringify(address),
  });
  return await res.json();
};

// Delete an address
export const deleteAddress = async (id: number): Promise<void> => {
  await fetchWithAuth(`/address/${id}`, {
    method: "DELETE",
  });
};
