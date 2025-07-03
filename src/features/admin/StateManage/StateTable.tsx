import { useState } from "react";
import type { State } from "./useStates";
import { Button } from "@/components/ui/button";

type Props = {
  items: State[];
  onEdit?: (item: State) => void;
  onDelete: (id: number) => void;
  onInlineUpdate: (id: number, updated: { name: string; code: string }) => void;
};

export default function StateTable({ items, onDelete, onInlineUpdate }: Props) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", code: "" });

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.code.toLowerCase().includes(search.toLowerCase())
  );

  const startInlineEdit = (item: State) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, code: item.code });
  };

  const cancelInlineEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", code: "" });
  };

  const saveInlineEdit = () => {
    if (editingId !== null) {
      onInlineUpdate(editingId, editForm);
      cancelInlineEdit();
    }
  };

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Total states: <strong>{filtered.length}</strong>
        </p>
        <input
          type="text"
          placeholder="Search by name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 border rounded px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto shadow rounded-md">
        <table className="w-full table-auto text-sm border divide-y dark:divide-slate-600 dark:border-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-800 dark:text-gray-300">
            <tr className="text-left">
              <th className="p-3">State Name</th>
              <th className="p-3">Code</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="dark:bg-slate-900 dark:text-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500 dark:text-gray-400 italic">
                  No matching states found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                  {editingId === item.id ? (
                    <>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className="w-full border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.code}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, code: e.target.value }))
                          }
                          className="w-full border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                        />
                      </td>
                      <td className="p-3 space-x-2">
                        <Button size="sm" onClick={saveInlineEdit}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelInlineEdit}>
                          Cancel
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.code}</td>
                      <td className="p-3 space-x-2">
                        <Button size="sm" variant="outline" onClick={() => startInlineEdit(item)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
                          Delete
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
