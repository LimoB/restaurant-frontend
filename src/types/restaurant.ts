import type { City } from "./location";

export interface Restaurant {
  id: number;
  name: string;
  city?: City;
}
