import client from "../api/client";

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

// Input type for creating/updating an order (without readonly fields)
export type OrderInput = Omit<Order, "id" | "created_at" | "updated_at" | "user" | "restaurant" | "driver" | "delivery_address">;

// Fetch all orders (with optional nested user/restaurant/driver)
export const fetchAllOrders = async (): Promise<Order[]> => {
  const res = await client.get("/orders");
  return res.data;
};

// Fetch single order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  const res = await client.get(`/orders/${id}`);
  return res.data;
};

// Create a new order
export const createOrder = async (data: OrderInput): Promise<Order> => {
  const res = await client.post("/orders", data);
  return res.data;
};

// Update an order (e.g. status or other fields)
export const updateOrder = async (
  id: number,
  data: Partial<OrderInput>
): Promise<Order> => {
  const res = await client.put(`/orders/${id}`, data);
  return res.data;
};

// Delete an order
export const deleteOrder = async (id: number): Promise<{ success: boolean }> => {
  const res = await client.delete(`/orders/${id}`);
  return res.data;
};
