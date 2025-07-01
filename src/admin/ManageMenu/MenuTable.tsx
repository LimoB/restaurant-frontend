import type { MenuItem } from "./useMenu";
import { Button } from "../../components/ui/button";

type Props = {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
};

export default function MenuTable({ items, onEdit, onDelete }: Props) {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic">
        No menu items found.
      </p>
    );
  }

  return (
    <div className="overflow-auto shadow rounded-md border border-gray-200 dark:border-gray-700">
      <table className="w-full table-auto text-sm divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-slate-800 dark:text-gray-300">
          <tr className="text-left">
            <th className="p-3">Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Ingredients</th>
            <th>Category</th>
            <th>Restaurant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
          {items.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <td className="p-3">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    onError={(e) =>
                      (e.currentTarget.src = "/fallback.jpg")
                    }
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    N/A
                  </div>
                )}
              </td>
              <td className="p-3">{item.name}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>{item.ingredients || "—"}</td>
              <td>{item.category?.name ?? "—"}</td>
              <td>{item.restaurant?.name ?? "—"}</td>
              <td className="p-3 space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
