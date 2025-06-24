import React, { useState } from "react";
import { toast } from "react-hot-toast";
import type { User } from "../admin/ManageUsers/types/user";

interface AddUserModalProps {
  isEditing: boolean;
  formData: User;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  closeModal: () => void;
  fetchUsers: () => Promise<void>;
}

const roleOptions = ["admin", "member", "driver", "owner"];

const AddUserModal: React.FC<AddUserModalProps> = ({
  isEditing,
  formData,
  setFormData,
  closeModal,
  fetchUsers,
}) => {
  const [loading, setLoading] = useState(false);





  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    const url = isEditing
      ? `http://localhost:3000/api/users/${formData.id}`
      : "http://localhost:3000/api/admin/create-user"; // ✅ your new backend route

    const method = isEditing ? "PUT" : "POST";

    const body = {
      full_name: formData.name,
      email: formData.email,
      contact_phone: formData.contact_phone,
      user_type: formData.user_type,
      ...(isEditing ? {} : { password: formData.password }), // Only send password on creation
    };

    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save user");
      }

      toast.success(isEditing ? "User updated" : "User created 🎉");
      closeModal();
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">{isEditing ? "Edit User" : "Add User"}</h2>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Phone"
          value={formData.contact_phone}
          onChange={(e) =>
            setFormData({ ...formData, contact_phone: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        />

        {!isEditing && (
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        )}

        <select
          value={formData.user_type}
          onChange={(e) =>
            setFormData({ ...formData, user_type: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : isEditing ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
