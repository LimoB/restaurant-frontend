import type { User } from "./types/user";
import { roleOptions, roleStyles } from "./types/user";
import { Button } from "../../components/ui/button";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: number, newRole: string) => void;
  onDelete: (userId: number) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const UserTable = ({
  users,
  onRoleChange,
  onDelete,
  currentPage,
  totalPages,
  setCurrentPage,
}: UserTableProps) => (
  <>
    <div className="overflow-auto shadow rounded-md">
      <table className="w-full table-auto text-sm border divide-y">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <select
                  value={user.user_type}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${roleStyles[user.user_type]} bg-white border`}
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-3 space-x-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              currentPage === num
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    )}
  </>
);

export default UserTable;
