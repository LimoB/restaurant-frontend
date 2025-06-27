// src/types/product.ts

export type Product = {
  id: string;
  name: string;

  /**
   * ✅ Price is a string to match API expectations.
   * Use Number(product.price) for calculations.
   */
  price: string;

  image: string;
  ingredients?: string;

  /**
   * ✅ Restaurant ID for linking to backend data
   */
  restaurant_id: number;

  /**
   * ✅ Optional full restaurant object
   */
  restaurant?: {
    id: number;
    name: string;
  };

  /**
   * ✅ Optional override name (used in UI display)
   */
  restaurant_name?: string;
};
