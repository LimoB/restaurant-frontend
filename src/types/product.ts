export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  ingredients?: string;
  restaurant_name?: string; // ✅ Add this
};
