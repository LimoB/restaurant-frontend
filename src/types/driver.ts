import type { BasicUser } from "./user";

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
