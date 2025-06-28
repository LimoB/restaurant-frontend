import type { City } from "./useCities";
import { Button } from "../../components/ui/button";

type Props = {
  items: City[];
  onEdit: (item: City) => void;
  onDelete: (id: number) => void;
};

export default function CityTable({ items, onEdit, onDelete }: Props) {
  if (items.length === 0) {
    return <p className="text-gray-500 italic">No cities found.</p>;
  }

  return (
    <div className="overflow-auto shadow rounded-md">
      <table className="w-full table-auto text-sm border divide-y">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="p-3">City Name</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="p-3">{item.name}</td>
              <td>{item.state?.name ?? "—"}</td>
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