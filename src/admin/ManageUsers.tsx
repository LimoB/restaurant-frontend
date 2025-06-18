import { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
import { toast, Toaster } from "react-hot-toast";

interface User {
    id: number;
    name: string;
    email: string;
    user_type: string;
    contact_phone: string;
    password?: string;
}

const roleStyles: Record<string, string> = {
    member: "bg-blue-100 text-blue-700",
    driver: "bg-green-100 text-green-700",
    owner: "bg-purple-100 text-purple-700",
    admin: "bg-red-100 text-red-700",
};

const roleOptions = ["admin", "member", "driver", "owner"];

function ManageUsers() {
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

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(
            (u) =>
                u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3000/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
            setFilteredUsers(data);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

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


    const handleSubmit = async () => {
        if (
            !formData.name ||
            !formData.email ||
            !formData.contact_phone ||
            !formData.user_type
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const url = isEditing
                ? `http://localhost:3000/api/users/${formData.id}`
                : `http://localhost:3000/api/admin/invite`;

            const payload = isEditing
                ? {
                    name: formData.name,
                    email: formData.email,
                    user_type: formData.user_type,
                    contact_phone: formData.contact_phone,
                }
                : {
                    full_name: formData.name, // ✅ Match backend expectation
                    email: formData.email,
                    user_type: formData.user_type,
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

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save user");
            }

            toast.success(isEditing ? "User updated" : "Invitation sent!");
            closeModal();
            fetchUsers();
        } catch (err: any) {
            toast.error(err.message || "An error occurred");
        }
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
            toast.success("User deleted");
            fetchUsers();
        } catch (err: any) {
            toast.error(err.message);
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

            toast.success("Role updated");
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, user_type: newRole } : u))
            );
        } catch (err: any) {
            toast.error("Error: " + err.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* <Sidebar /> */}
            <Toaster position="top-right" />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Manage Users</h1>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add User
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 px-3 py-2 border rounded w-full max-w-md"
                />

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {!loading && !error && (
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
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
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

                        <div className="flex justify-center gap-2 mt-6">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
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
                            ))}
                        </div>
                    </>
                )}

                {showModal && (
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
                                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {!isEditing && (
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            )}
                            <select
                                value={formData.user_type}
                                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
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
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {isEditing ? "Update" : "Create"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ManageUsers;
