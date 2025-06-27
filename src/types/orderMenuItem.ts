import type { MenuItem } from "./menu";

export interface OrderMenuItem {
  id: number;
  quantity: number;
  price: string;
  comment?: string;
  menu_item: MenuItem;
}
