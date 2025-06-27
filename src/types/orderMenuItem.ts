import type { MenuItem } from "./menu";

export interface OrderMenuItem {
  item_name: string | undefined;
  image: any;
  id: number;
  quantity: number;
  price: string;
  comment?: string;
  menu_item: MenuItem;
}
