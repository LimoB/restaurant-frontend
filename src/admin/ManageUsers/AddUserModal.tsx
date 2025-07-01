import React, { useState } from "react";
import { toast } from "react-hot-toast";
import type { User } from "./types/user";
import { Button } from "../../components/ui/button";

interface AddUserModalProps {
  formData: User;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  closeModal: () => void;
  fetchUsers: () => Promise<void>;
}

const roleOptions = ["admin", "member", "driver", "owner"];

const AddUserModal: React.FC<AddUserModalProps> = ({
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

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          contact_phone: formData.contact_phone,
          user_type: formData.user_type,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      toast.success("User created 🎉");
      closeModal();
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 p-6 rounded shadow-lg w-full max-w-md space-y-4 border dark:border-slate-700">
        <h2 className="text-xl font-bold">Add User</h2>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

        <input
          type="text"
          placeholder="Phone"
          value={formData.contact_phone}
          onChange={(e) =>
            setFormData({ ...formData, contact_phone: e.target.value })
          }
          className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

        <select
          value={formData.user_type}
          onChange={(e) =>
            setFormData({ ...formData, user_type: e.target.value })
          }
          className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            onClick={closeModal}
            variant="outline"
            size="md"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="md"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
