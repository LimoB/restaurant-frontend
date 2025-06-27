// Reusable entity types
export interface BasicUser {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

export interface City {
  name: string;
  state?: {
    name: string;
  };
}

export interface Address {
  id?: number;
  city?: City;
}

export interface Restaurant {
  id?: number;
  name: string;
  city?: City;
}

export interface Driver {
  id?: number;
  name?: string;
  car_make?: string;
  car_model?: string;
  car_year?: string;
  license_plate?: string;
  active?: boolean;
  user?: BasicUser;
}

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: string;
  category: {
    id: number;
    name: string;
  };
  restaurant?: {
    id?: number;
    name?: string;
  };
}

export interface OrderMenuItem {
  id: number;
  quantity: number;
  price: string;
  comment?: string;
  menu_item: MenuItem;
}

export interface OrderComment {
  id: number;
  comment_text: string;
  comment_type: "restaurant" | "driver" | "order";
  rating: number;
  user: BasicUser;
}

export interface OrderStatusEntry {
  id: number;
  created_at: string;
  statusCatalog: {
    name: string;
  };
}

// Order main model
export interface Order {
  id: number;
  driver_id: number | null;

  status: "pending" | "accepted" | "rejected" | "delivered";
  final_price: string;
  price: string;
  discount: string;
  comment?: string;
  actual_delivery_time?: string;
  created_at: string;
  updated_at?: string;

  user?: BasicUser & { address?: Address };
  restaurant?: Restaurant;
  driver?: Driver | null;
  delivery_address?: Address;
  orderMenuItems?: OrderMenuItem[];
  comments?: OrderComment[];
  statuses?: OrderStatusEntry[];
}

// ✅ For creating a new order (POST /orders)
export type OrderInput = {
  user_id: number;
  restaurant_id: number;
  delivery_address_id: number;
  driver_id: number | null;
  price: string;
  discount: string;
  final_price: string;
  comment?: string;
  status: "pending" | "accepted" | "rejected" | "delivered";
  actual_delivery_time?: string;

  cart: {
    menu_item_id: number;
    item_name: string;
    quantity: number;
    price: string;
    comment?: string;
  }[];
};
