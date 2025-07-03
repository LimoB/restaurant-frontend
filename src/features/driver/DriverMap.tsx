// src/driver/DriverMap.tsx
export default function DriverMap() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-orange-800">🗺️ Delivery Map</h1>
      <div className="rounded-lg border border-orange-200 shadow p-4 bg-white text-[#442c1c]">
        <p className="mb-2">Map view is currently mocked.</p>
        <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
          [ Map placeholder ]
        </div>
      </div>

      <div className="bg-white p-4 border rounded shadow text-[#442c1c]">
        <h2 className="font-semibold mb-2">📍 Pinned Delivery Locations</h2>
        <ul className="space-y-2 text-sm">
          <li>• 123 Riverside Drive, Nairobi (Alice Wanjiku)</li>
          <li>• Westlands Ave 45 (Brian Otieno)</li>
          <li>• Kileleshwa Towers, 3rd Floor (Grace Kamau)</li>
        </ul>
      </div>
    </div>
  );
}
