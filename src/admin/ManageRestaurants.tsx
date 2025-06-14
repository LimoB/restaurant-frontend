// src/admin/ManageRestaurants.tsx
import Sidebar from "./Sidebar";

const mockRestaurants = [
  { id: 1, name: "Mama's Kitchen", owner: "Alice", location: "Nairobi" },
  { id: 2, name: "Sushi Palace", owner: "Bob", location: "Mombasa" },
  { id: 3, name: "Burger Haven", owner: "Charlie", location: "Kisumu" },
];

function ManageRestaurants() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Manage Restaurants</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4">ID</th>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Owner</th>
                <th className="text-left py-2 px-4">Location</th>
              </tr>
            </thead>
            <tbody>
              {mockRestaurants.map((rest) => (
                <tr key={rest.id} className="border-t">
                  <td className="py-2 px-4">{rest.id}</td>
                  <td className="py-2 px-4">{rest.name}</td>
                  <td className="py-2 px-4">{rest.owner}</td>
                  <td className="py-2 px-4">{rest.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageRestaurants;
