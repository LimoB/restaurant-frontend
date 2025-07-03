import { useEffect, useState } from "react";
import { Edit, Plus } from "lucide-react";
import mockMenuItems from "../mockMenuItems"; // Replace with actual data or API later
import mockRestaurants from "../mockRestaurants"; // Replace with actual data or API

interface MenuItem {
  id: number;
  name: string;
  price: string;
  description?: string;
  restaurantId: number;
}


export default function OwnerMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | "all">("all");
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    // Simulate API delay
    setLoading(true);
    setTimeout(() => {
      setMenuItems(mockMenuItems);
      setLoading(false);
    }, 500);
  }, []);

  const filteredItems =
    selectedRestaurant === "all"
      ? menuItems
      : menuItems.filter((item) => item.restaurantId === selectedRestaurant);

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRestaurant(value === "all" ? "all" : parseInt(value));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-800">📋 My Menu</h1>
        <button
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl"
          onClick={() => setEditItem({ id: 0, name: "", price: "", restaurantId: 1 })}
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-[#442c1c]">Filter by Restaurant</label>
        <select
          value={selectedRestaurant}
          onChange={handleRestaurantChange}
          className="w-full md:w-64 border border-gray-300 px-3 py-2 rounded-xl focus:outline-none"
        >
          <option value="all">All Restaurants</option>
          {mockRestaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredItems.length === 0 ? (
        <p>No menu items found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-xl bg-white shadow text-[#442c1c] relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-lg">{item.name}</div>
                  <p className="text-sm text-gray-600">
                    {item.description || "No description"}
                  </p>
                  <p className="mt-1 text-orange-700 font-bold">${item.price}</p>
                </div>
                <button
                  className="text-orange-600 hover:text-orange-800"
                  onClick={() => setEditItem(item)}
                >
                  <Edit size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🔧 Edit Modal (Mock) */}
      {editItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl space-y-4 shadow-xl">
            <h2 className="text-xl font-semibold text-[#442c1c]">
              {editItem.id === 0 ? "Add Menu Item" : "Edit Menu Item"}
            </h2>
            <input
              type="text"
              value={editItem.name}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Item Name"
            />
            <input
              type="text"
              value={editItem.price}
              onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Price"
            />
            <textarea
              value={editItem.description || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Description"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditItem(null)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  // mock submit
                  console.log("🔧 Save item", editItem);
                  setEditItem(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
