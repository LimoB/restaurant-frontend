import type { Restaurant } from "./restaurant";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  ingredients?: string;
  image_url?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  category: {
    id: number;
    name: string;
    image_url?: string;
  };
  restaurant: Restaurant;
}
