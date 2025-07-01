export interface BasicUser {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  contact_phone?: string; // ✅ Added this line
  address_id?: number;
  image_url?: string;     // ✅ Already present
}
