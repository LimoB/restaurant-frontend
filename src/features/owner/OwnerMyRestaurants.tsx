import { useEffect, useState } from "react";

interface Restaurant {
  id: number;
  name: string;
  location: string;
}

const mockRestaurants: Restaurant[] = [
  { id: 1, name: "Limo Deli", location: "Nairobi CBD" },
  { id: 2, name: "The Sunset Grill", location: "Westlands" },
];

export default function OwnerMyRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateFetch = () => {
      setTimeout(() => {
        setRestaurants(mockRestaurants); // 👈 Replace with actual fetch logic later
        setLoading(false);
      }, 500); // Simulated delay
    };

    simulateFetch();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-orange-800">🍽️ My Restaurants</h1>
      {loading ? (
        <p>Loading...</p>
      ) : restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul className="space-y-3">
          {restaurants.map((r) => (
            <li
              key={r.id}
              className="p-4 border rounded-lg shadow bg-white text-[#442c1c]"
            >
              <div className="font-semibold text-lg">{r.name}</div>
              <div className="text-sm text-gray-600">{r.location}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
