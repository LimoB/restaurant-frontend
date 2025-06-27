// src/types/cart.ts

export type CartItem = {
  id: string | number;
  name: string;
  quantity: number;

  /**
   * ✅ Keep price as string for API compatibility.
   * Use Number(item.price) when performing arithmetic.
   */
  price: string;

  restaurant_id: number; // ✅ Required for order submission
  comment?: string; // ✅ Optional for user notes

  // Optional metadata
  image?: string;
  ingredients?: string;
  restaurant_name?: string;
};
