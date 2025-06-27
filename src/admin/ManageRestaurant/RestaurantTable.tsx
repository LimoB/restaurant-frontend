import type { Restaurant } from "./useRestaurants";
import { Button } from "../../components/ui/button"; // adjust path if needed

type Props = {
    restaurants: Restaurant[];
    onEdit: (rest: Restaurant) => void;
    onDelete: (id: number) => void;
};

export default function RestaurantTable({ restaurants, onEdit, onDelete }: Props) {
    if (restaurants.length === 0) {
        return <p className="text-gray-500 italic mt-4">No restaurants found.</p>;
    }

    return (
        <div className="overflow-x-auto mt-4 rounded-lg shadow border border-gray-200 bg-white">
            <table className="w-full text-sm text-left table-auto">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Owner</th>
                        <th className="px-6 py-3">City</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {restaurants.map((rest) => (
                        <tr
                            key={rest.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4">{rest.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{rest.name}</td>
                            <td className="px-6 py-4">{rest.owner?.name || "N/A"}</td>
                            <td className="px-6 py-4">{rest.address?.city?.name || "N/A"}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <Button size="sm" variant="outline" onClick={() => onEdit(rest)}>
                                    Edit
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => onDelete(rest.id)}>
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
