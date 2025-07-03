// import React = require("react");
import type { City } from "./useRestaurants";

type Props = {
  form: { name: string; ownerId: string; cityId: string };
  cities: City[];
  onChange: (field: string, value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  editing: boolean | null;
};

export default function RestaurantForm({
  form,
  cities,
  onChange,
  onCancel,
  onSubmit,
  editing,
}: Props) {
  return (
    <div className="space-y-4 text-gray-800 dark:text-gray-100">
      <input
        type="text"
        placeholder="Restaurant Name"
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
        required
      />

      <input
        type="number"
        placeholder="Owner ID"
        value={form.ownerId}
        onChange={(e) => onChange("ownerId", e.target.value)}
        className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
        required
      />

      <select
        value={form.cityId}
        onChange={(e) => onChange("cityId", e.target.value)}
        className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-4 py-2 border rounded hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-white"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={onSubmit}
        >
          {editing ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
