import type { Restaurant } from "./restaurant";

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: string;
  category: {
    id: number;
    name: string;
  };
  restaurant: Restaurant;
}
