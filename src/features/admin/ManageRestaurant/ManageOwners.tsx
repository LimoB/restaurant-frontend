import { useState, useEffect } from "react";
import type { User } from "@/features/admin/ManageUsers/types/user";
import UsersList from "@/features/admin/ManageUsers/UserTable";
import { toast } from "react-hot-toast";

export default function OwnerManagement() {
  const [owners, setOwners] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOwners = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/users?role=owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch owners");

      const data: User[] = await res.json();
      const filtered = data.filter((user) => user.user_type === "owner");
      setOwners(filtered);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this owner?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete owner");

      toast.success("Owner deleted");
      fetchOwners();
    } catch (err: any) {
      toast.error(err.message || "Error deleting owner");
    }
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_type: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      toast.success("Role updated");
      setOwners((prev) =>
        prev.map((u) => (u.id === id ? { ...u, user_type: newRole } : u))
      );
    } catch (err: any) {
      toast.error(err.message || "Error updating role");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Restaurant Owners</h1>

      {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      {!loading && !error && (
        <UsersList
          users={owners}
          onDelete={handleDelete}
          onRoleChange={handleRoleChange}
          currentPage={0}
          totalPages={0}
          setCurrentPage={() => {}}
        />
      )}
    </div>
  );
}
