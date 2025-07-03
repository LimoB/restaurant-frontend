// src/types/driver.ts
import type { BasicUser } from "./user";

export interface Driver {
  name: string;
  id: number;                 // Unique driver ID
  user_id: number;           // Foreign key to users table

  // Vehicle information
  car_make: string;
  car_model: string;
  car_year: string;
  license_plate: string;

  // Status
  active: boolean;

  // Timestamps (optional depending on query)
  created_at?: string;
  updated_at?: string;

  // Populated user object (optional)
  user?: BasicUser;
}
