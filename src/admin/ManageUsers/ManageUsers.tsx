// ManageUsers.tsx
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { type User, roleOptions, roleStyles } from "./types/user";
import AddUserModal from "../../components/AddUserModal";

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState<User>({
        id: 0,
        name: "",
        email: "",
        user_type: "member",
        contact_phone: "",
        password: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You are not authenticated. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) throw new Error("Unauthorized session");
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
            setFilteredUsers(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = users.filter(
            (u) =>
                u.name.toLowerCase().includes(term) ||
                u.email.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [searchTerm, users]);

    const openModal = (user?: User) => {
        setIsEditing(!!user);
        setFormData(
            user ?? {
                id: 0,
                name: "",
                email: "",
                contact_phone: "",
                user_type: "member",
                password: "",
            }
        );
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({
            id: 0,
            name: "",
            email: "",
            contact_phone: "",
            user_type: "member",
            password: "",
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this user?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete user");
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (err: any) {
            toast.error(err.message || "Error deleting user");
        }
    };

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ user_type: newRole }),
            });
            if (!res.ok) throw new Error("Failed to update role");
            toast.success("User role updated");
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, user_type: newRole } : u))
            );
        } catch (err: any) {
            toast.error(err.message || "Error updating role");
        }
    };

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Toaster position="top-right" />
            <main className="flex-1 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                        Manage Users
                    </h1>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        + Add User
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 px-3 py-2 border rounded w-full max-w-md shadow-sm"
                />

                {loading ? (
                    <p className="text-gray-600">Loading users...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow rounded-lg">
                                <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
                                    <tr>
                                        <th className="text-left py-3 px-6">ID</th>
                                        <th className="text-left py-3 px-6">Name</th>
                                        <th className="text-left py-3 px-6">Email</th>
                                        <th className="text-left py-3 px-6">Role</th>
                                        <th className="text-left py-3 px-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {currentUsers.map((user) => (
                                        <tr key={user.id} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-6">{user.id}</td>
                                            <td className="py-3 px-6">{user.name}</td>
                                            <td className="py-3 px-6">{user.email}</td>
                                            <td className="py-3 px-6">
                                                <select
                                                    value={user.user_type}
                                                    onChange={(e) =>
                                                        handleRoleChange(user.id, e.target.value)
                                                    }
                                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${roleStyles[user.user_type]}`}
                                                >
                                                    {roleOptions.map((role) => (
                                                        <option key={role} value={role}>
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="py-3 px-6 space-x-2">
                                                <button
                                                    className="text-sm text-blue-600 hover:underline"
                                                    onClick={() => openModal(user)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-sm text-red-600 hover:underline"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (num) => (
                                        <button
                                            key={num}
                                            onClick={() => setCurrentPage(num)}
                                            className={`px-3 py-1 rounded ${currentPage === num
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-800"
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                    </>
                )}

                {showModal && (
                    <AddUserModal
                        isEditing={isEditing}
                        formData={formData}
                        setFormData={setFormData}
                        closeModal={closeModal}
                        fetchUsers={fetchUsers}
                    />
                )}
            </main>
        </div>
    );
};

export default ManageUsers;
