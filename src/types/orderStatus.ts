export type OrderStatus = "pending" | "accepted" | "rejected" | "delivered";

export interface OrderStatusEntry {
  id: number;
  created_at: string;
  statusCatalog: {
    name: string;
  };
}

export const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
};
