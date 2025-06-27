import type { BasicUser } from "./user";

export interface OrderComment {
  id: number;
  comment_text: string;
  comment_type: "restaurant" | "driver" | "order";
  rating: number;
  user: BasicUser;
}
