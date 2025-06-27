import client from "../api/client";
import { toast } from "react-toastify";
import type { Order, OrderInput } from "../types/order";
import type { AxiosError } from "axios";

// ✅ Graceful error handler

const handleRequestError = (error: unknown, fallbackMessage = "Something went wrong") => {
  const axiosError = error as AxiosError<any>; // 👈 capture error shape from axios

  if (axiosError?.response) {
    const { status, data } = axiosError.response;

    const errorMessage =
      typeof data === "object" && data !== null && "message" in data
        ? (data.message as string)
        : fallbackMessage;

    if (status === 429) {
      toast.error("Too many requests. Please wait and try again.");
    } else {
      toast.error(errorMessage);
    }

    console.error("❌ Order API error:", data || axiosError.message);
  } else {
    toast.error(fallbackMessage);
    console.error("❌ Unknown error:", error);
  }

  throw error;
};

// ✅ Fetch all orders
export const fetchAllOrders = async (): Promise<Order[]> => {
  console.log("📤 Fetching all orders...");
  try {
    const res = await client.get<Order[]>("/orders");
    console.log("✅ Orders fetched:", res.data);
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to load orders.");
  }
};

// ✅ Fetch a single order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  console.log(`📤 Fetching order with ID: ${id}`);
  try {
    const res = await client.get<Order>(`/orders/${id}`);
    console.log("✅ Order fetched:", res.data);
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to fetch order.");
  }
};

// ✅ Create a new order
export const createOrder = async (data: OrderInput): Promise<Order> => {
  console.log("📦 Creating order with payload:", data);
  try {
    const res = await client.post<Order>("/orders", data);
    console.log("✅ Order created:", res.data);
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to create order.");
  }
};

// ✅ Update an existing order
export const updateOrder = async (
  id: number,
  data: Partial<OrderInput>
): Promise<Order> => {
  console.log(`🛠 Updating order ID ${id} with:`, data);
  try {
    const res = await client.put<Order>(`/orders/${id}`, data);
    console.log("✅ Order updated:", res.data);
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to update order.");
  }
};

// ✅ Delete an order
export const deleteOrder = async (id: number): Promise<{ success: boolean }> => {
  console.log(`🗑 Deleting order ID: ${id}`);
  try {
    const res = await client.delete<{ success: boolean }>(`/orders/${id}`);
    console.log("✅ Order deleted:", res.data);
    toast.success("Order deleted successfully.");
    return res.data;
  } catch (error) {
    return handleRequestError(error, "Failed to delete order.");
  }
};
