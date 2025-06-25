import client from "../api/client";
import { toast } from "react-toastify";

// Define structure for related entities
export interface User {
  id: number;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
}

export interface Address {
  id: number;
  city: {
    name: string;
    state: {
      name: string;
    };
  };
}

export interface Driver {
  id: number;
  name: string;
}

// Define Order model for read operations (includes relations)
export interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  delivery_address_id: number;
  driver_id: number;
  price: string;
  discount: string;
  final_price: string;
  comment: string;
  status: "pending" | "accepted" | "rejected" | "delivered";
  actual_delivery_time: string;
  created_at: string;
  updated_at?: string;

  // Optional nested relations
  user?: User;
  restaurant?: Restaurant;
  driver?: Driver;
  delivery_address?: Address;
}

// Input type for creating/updating an order (excluding readonly/nested fields)
export type OrderInput = Omit<
  Order,
  "id" | "created_at" | "updated_at" | "user" | "restaurant" | "driver" | "delivery_address"
>;

// Utility function for error handling
const handleRequestError = (error: any, message = "Something went wrong") => {
  if (error?.response?.status === 429) {
    toast.error("Too many requests. Please wait and try again.");
  } else {
    toast.error(message);
  }
  console.error("Order API error:", error);
  throw error;
};

// Fetch all orders
export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const res = await client.get("/orders");
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to load orders.");
  }
};

// Fetch single order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  try {
    const res = await client.get(`/orders/${id}`);
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to fetch order.");
  }
};

// Create a new order
export const createOrder = async (data: OrderInput): Promise<Order> => {
  try {
    const res = await client.post("/orders", data);
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to create order.");
  }
};

// Update an order
export const updateOrder = async (
  id: number,
  data: Partial<OrderInput>
): Promise<Order> => {
  try {
    const res = await client.put(`/orders/${id}`, data);
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to update order.");
  }
};

// Delete an order
export const deleteOrder = async (id: number): Promise<{ success: boolean }> => {
  try {
    const res = await client.delete(`/orders/${id}`);
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to delete order.");
  }
};
