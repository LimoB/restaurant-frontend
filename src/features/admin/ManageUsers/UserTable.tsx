import type { User } from "./types/user";
import { roleOptions, roleStyles } from "./types/user";
import { Button } from "@/components/ui/button";

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
    <div className="overflow-auto shadow rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <table className="w-full table-auto text-sm divide-y divide-gray-200 dark:divide-slate-700">
        <thead className="bg-gray-50 dark:bg-slate-800 text-left text-gray-700 dark:text-gray-300 uppercase text-xs">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 dark:text-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <select
                  value={user.user_type}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border dark:bg-slate-800 dark:border-slate-600 dark:text-white ${roleStyles[user.user_type]}`}
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
                : "bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600 hover:bg-gray-300"
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
