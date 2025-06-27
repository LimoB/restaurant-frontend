export type CartItem = {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  restaurant_id?: number;
  comment?: string; // ✅ Optional comment
};
