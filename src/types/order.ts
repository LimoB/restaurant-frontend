import type { BasicUser } from "./user";
import type { Address } from "./location";
import type { Restaurant } from "./restaurant";
import type { Driver } from "./driver";
import type { OrderMenuItem } from "./orderMenuItem";
import type { OrderComment } from "./orderComment";
import type { OrderStatus, OrderStatusEntry } from "./orderStatus";

export interface Order {
  expected_delivery: any;
  delivery_time: any;
  id: number;
  driver_id: number | null;

  status: OrderStatus;
  total: string | number;
  price: string | number;
  discount: string | number;
  final_price: string | number;
  comment?: string;

  created_at: string;
  updated_at?: string;
  actual_delivery_time?: string;

  items?: OrderMenuItem[];
  orderMenuItems?: OrderMenuItem[];

  user?: BasicUser & {
    address?: Address;
  };

  restaurant?: Restaurant;
  driver?: Driver | null;
  delivery_address?: Address;

  comments?: OrderComment[];
  statuses?: OrderStatusEntry[];
}

export interface OrderInput {
  user_id: number;
  restaurant_id: number;
  delivery_address_id: number;
  driver_id: number | null;

  price: string;
  discount: string;
  final_price: string;
  comment?: string;
  status: OrderStatus;
  actual_delivery_time?: string;

  cart: {
    menu_item_id: number;
    item_name: string;
    quantity: number;
    price: string;
    comment?: string;
  }[];
}
