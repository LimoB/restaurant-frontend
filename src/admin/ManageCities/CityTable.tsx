import type { City } from "./useCities";
import { Button } from "../../components/ui/button";

type Props = {
  items: City[];
  onEdit: (item: City) => void;
  onDelete: (id: number) => void;
};

export default function CityTable({ items, onEdit, onDelete }: Props) {
  if (items.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 italic">No cities found.</p>;
  }

  return (
    <div className="overflow-auto shadow rounded-md border border-gray-200 dark:border-slate-700">
      <table className="w-full table-auto text-sm divide-y divide-gray-200 dark:divide-slate-700">
        <thead className="bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
          <tr className="text-left">
            <th className="p-3">City Name</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-900">
          {items.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              <td className="p-3 text-gray-800 dark:text-gray-100">{item.name}</td>
              <td className="text-gray-700 dark:text-gray-300">{item.state?.name ?? "—"}</td>
              <td className="space-x-2">
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
