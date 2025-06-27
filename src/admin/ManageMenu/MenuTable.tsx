import type { MenuItem } from "./useMenu";
import { Button } from "../../components/ui/button";

type Props = {
    items: MenuItem[];
    onEdit: (item: MenuItem) => void;
    onDelete: (id: number) => void;
};

export default function MenuTable({ items, onEdit, onDelete }: Props) {
    if (items.length === 0) {
        return <p className="text-gray-500 italic">No menu items found.</p>;
    }

    return (
        <div className="overflow-auto shadow rounded-md">
            <table className="w-full table-auto text-sm border divide-y">
                <thead className="bg-gray-50">
                    <tr className="text-left">
                        <th className="p-3">Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Ingredients</th>
                        <th>Restaurant</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="p-3">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover border"
                                        onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                        N/A
                                    </div>
                                )}
                            </td>
                            <td className="p-3">{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.ingredients || "—"}</td>
                            <td>{item.restaurant?.name ?? "—"}</td>
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
