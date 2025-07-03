// types/user.ts

export interface User {
  id: number;
  name: string;
  email: string;
  user_type: string;
  contact_phone: string;
  password?: string;
}

export const roleStyles: Record<string, string> = {
  member: "bg-blue-100 text-blue-700",
  driver: "bg-green-100 text-green-700",
  owner: "bg-purple-100 text-purple-700",
  admin: "bg-red-100 text-red-700",
};

export const roleOptions = ["admin", "member", "driver", "owner"];
