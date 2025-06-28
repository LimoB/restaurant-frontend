import client from "../api/client";
import { toast } from "react-toastify";
import type { Order, OrderInput } from "../types/order";
import type { AxiosError } from "axios";

// ✅ Graceful error handler
const handleRequestError = <T = any>(
  error: unknown,
  fallbackMessage = "Something went wrong",
  fallbackValue?: T
): T => {
  const axiosError = error as AxiosError<any>;

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

  if (fallbackValue !== undefined) return fallbackValue;
  throw error;
};

// ✅ Response types
interface OrdersResponse {
  success: boolean;
  data: Order[];
}

interface OrderCreateResponse {
  success: boolean;
  message: string;
  data: {
    order: Order;
    items: any[];
  };
}

// ✅ Fetch all orders
export const fetchAllOrders = async (): Promise<Order[]> => {
  console.log("📤 Fetching all orders...");
  try {
    const res = await client.get<OrdersResponse>("/orders");
    console.log("✅ Orders fetched:", res.data);
    return res.data.data;
  } catch (error) {
    return handleRequestError<Order[]>(error, "Failed to load orders.", []);
  }
};

// ✅ Fetch a single order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  console.log(`📤 Fetching order with ID: ${id}`);
  try {
    const res = await client.get<{ success: boolean; data: Order }>(`/orders/${id}`);
    console.log("✅ Order fetched:", res.data);
    return res.data.data;
  } catch (error) {
    return handleRequestError(error, "Failed to fetch order.");
  }
};

// ✅ Create a new order
export const createOrder = async (data: OrderInput): Promise<Order> => {
  console.log("📦 Creating order with payload:", data);
  try {
    const res = await client.post<OrderCreateResponse>("/orders", data);
    console.log("✅ Order created:", res.data.data);
    return res.data.data.order;
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
    const res = await client.put<{ success: boolean; data: Order }>(`/orders/${id}`, data);
    console.log("✅ Order updated:", res.data);
    return res.data.data;
  } catch (error) {
    return handleRequestError(error, "Failed to update order.");
  }
};

// ✅ Fetch orders for a specific user
export const fetchOrdersByUserId = async (
  userId: number,
  token?: string
): Promise<Order[]> => {
  console.log(`📤 Fetching orders for user ID: ${userId}`);
  try {
    const res = await client.get<OrdersResponse>(`/orders/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Orders for user:", res.data);
    return res.data.data;
  } catch (error) {
    return handleRequestError(error, "Failed to load your orders.", []);
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
