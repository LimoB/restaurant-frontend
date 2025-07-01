export interface BasicUser {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address_id?: number;
  image_url?: string; // ✅ Added for profile avatar
}
