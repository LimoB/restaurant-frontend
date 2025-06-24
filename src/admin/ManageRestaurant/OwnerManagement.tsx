import { useState } from "react";
import { User } from "../ManageUsers/types/user";
import { useUsers } from "../ManageUsers/hooks/useUsers";
import UsersList from "../ManageUsers/UsersList";
import UserFormModal from "../ManageUsers/UserFormModal";
import { toast } from "react-hot-toast";

export default function OwnerManagement() {
    const { users, setUsers, loading, error, fetchUsers } = useUsers();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const isEditing = Boolean(selectedUser);

    const owners = users.filter((u) => u.user_type === "owner");

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

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
            fetchUsers();
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
            setUsers((prev) =>
                prev.map((u) => (u.id === id ? { ...u, user_type: newRole } : u))
            );
        } catch (err: any) {
            toast.error(err.message || "Error updating role");
        }
    };

    const handleSubmit = async (formData: Partial<User>) => {
        const token = localStorage.getItem("token");

        try {
            const url = isEditing
                ? `http://localhost:3000/api/users/${formData.id}`
                : `http://localhost:3000/api/admin/invite`;

            const payload = isEditing
                ? {
                    name: formData.name,
                    email: formData.email,
                    user_type: "owner",
                    contact_phone: formData.contact_phone,
                }
                : {
                    full_name: formData.name,
                    email: formData.email,
                    user_type: "owner",
                    contact_phone: formData.contact_phone,
                };

            const res = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save owner");

            toast.success(isEditing ? "Owner updated" : "Invitation sent");
            fetchUsers();
            setShowModal(false);
            setSelectedUser(null);
        } catch (err: any) {
            toast.error(err.message || "An error occurred");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Restaurant Owners</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => {
                        setSelectedUser(null);
                        setShowModal(true);
                    }}
                >
                    + Add Owner
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
                <UsersList
                    users={owners}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRoleChange={handleRoleChange}
                />
            )}

            <UserFormModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedUser(null);
                }}
                onSubmit={handleSubmit}
                initialData={selectedUser ?? undefined}
                isEditing={isEditing}
            />
        </div>
    );
}
