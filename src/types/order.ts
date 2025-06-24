export interface Order {
  id: number;
  status: "pending" | "accepted" | "rejected" | "delivered";
  final_price: string;
  price: string;
  discount: string;
  comment?: string;
  actual_delivery_time?: string;
  created_at: string;
  updated_at?: string;
  user?: { id?: number; name: string };
  restaurant?: { id?: number; name: string };
  driver?: { id?: number; name: string };
  delivery_address?: {
    id?: number;
    city: { name: string; state: { name: string } };
  };
}
