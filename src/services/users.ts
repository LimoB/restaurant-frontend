// services/user.ts
import { store } from "../store/store"; // update path as needed

export interface User {
  id: number;
  name: string;
  email: string;
  user_type: string;
  contact_phone: string;
  image_url?: string;
  password?: string;
}

const API_URL = "http://localhost:3000/api";

// ✅ Get token from Redux, not localStorage
const getToken = () => store.getState().auth.token || "";

export const fetchAllUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  const users = await res.json();
  return users.map((user: User) => ({
    ...user,
    image_url: user.image_url || "/default-avatar.png",
  }));
};

export const deleteUser = async (id: number) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Failed to delete user");
};

export const updateUserRole = async (id: number, user_type: string) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ user_type }),
  });

  if (!res.ok) throw new Error("Failed to update role");
};

export const createOrUpdateUser = async (
  user: User,
  isEditing: boolean
): Promise<void> => {
  const url = isEditing
    ? `${API_URL}/users/${user.id}`
    : `${API_URL}/admin/invite`;

  const payload = isEditing
    ? {
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        contact_phone: user.contact_phone,
      }
    : {
        full_name: user.name,
        email: user.email,
        user_type: user.user_type,
        contact_phone: user.contact_phone,
        password: user.password,
      };

  const res = await fetch(url, {
    method: isEditing ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to save user");
  }
};
