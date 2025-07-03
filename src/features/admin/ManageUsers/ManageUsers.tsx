import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useUsers } from "./useUsers";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import type { User } from "./types/user";
import { Button } from "@/components/ui/button";

const ManageUsers = () => {
  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    currentUsers,
    handleRoleChange,
    handleDelete,
    fetchUsers,
  } = useUsers();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    user_type: "member",
    contact_phone: "",
    password: undefined,
  });

  const openModal = () => {
    setFormData({
      id: 0,
      name: "",
      email: "",
      user_type: "member",
      contact_phone: "",
      password: undefined,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: 0,
      name: "",
      email: "",
      user_type: "member",
      contact_phone: "",
      password: undefined,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white">
      <Toaster position="top-right" />
      <main className="flex-1 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold">Manage Users</h1>
          <Button onClick={openModal} variant="primary" size="md">
            + Add User
          </Button>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-3 py-2 border rounded w-full max-w-md shadow-sm bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <UserTable
            users={currentUsers}
            onRoleChange={handleRoleChange}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}

        {showModal && (
          <AddUserModal
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
