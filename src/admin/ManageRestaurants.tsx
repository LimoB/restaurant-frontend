// src/admin/ManageRestaurants.tsx

import { useEffect, useState } from "react";
import {
  fetchRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  fetchRestaurantsByCity,
} from "../services/restaurants";
import { fetchCities } from "../services/city";
import Modal from "../components/Modal";

// Updated interfaces with optional fields
interface Restaurant {
  id: number;
  name: string;
  owner?: { name: string; id: number };
  address?: { city?: { name: string; id: number } };
}

interface City {
  id: number;
  name: string;
}

export default function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<number | "all">("all");

  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Restaurant | null>(null);
  const [form, setForm] = useState({ name: "", ownerId: "", cityId: "" });

  useEffect(() => {
    loadRestaurants();
    loadCities();
  }, [selectedCity]);

  const loadRestaurants = async () => {
    try {
      const data =
        selectedCity === "all"
          ? await fetchRestaurants()
          : await fetchRestaurantsByCity(Number(selectedCity));
      setRestaurants(data);
    } catch (e) {
      console.error("Failed to load restaurants", e);
    }
  };

  const loadCities = async () => {
    try {
      const data = await fetchCities();
      setCities(data);
    } catch (e) {
      console.error("Failed to load cities", e);
    }
  };

  const openCreateModal = () => {
    setEditing(null);
    setForm({ name: "", ownerId: "", cityId: "" });
    setModalOpen(true);
  };

  const openEditModal = (restaurant: Restaurant) => {
    setEditing(restaurant);
    setForm({
      name: restaurant.name,
      ownerId: restaurant.owner?.id?.toString() || "",
      cityId: restaurant.address?.city?.id?.toString() || "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!form.name || !form.ownerId || !form.cityId) {
        alert("All fields required");
        return;
      }

      if (editing) {
        await updateRestaurant(editing.id, {
          name: form.name,
          ownerId: Number(form.ownerId),
          cityId: Number(form.cityId),
        });
      } else {
        await createRestaurant({
          name: form.name,
          ownerId: Number(form.ownerId),
          cityId: Number(form.cityId),
        });
      }

      setModalOpen(false);
      await loadRestaurants();
    } catch (e) {
      console.error("Failed to save restaurant", e);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await deleteRestaurant(id);
        await loadRestaurants();
      } catch (e) {
        console.error("Failed to delete restaurant", e);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Manage Restaurants</h1>

      <div className="flex items-center gap-4 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={openCreateModal}
        >
          + New Restaurant
        </button>

        <select
          value={selectedCity}
          onChange={(e) =>
            setSelectedCity(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="px-3 py-2 border rounded"
        >
          <option value="all">All Cities</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Owner</th>
            <th className="py-2 px-4 text-left">City</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((rest) => (
            <tr key={rest.id} className="border-t">
              <td className="py-2 px-4">{rest.id}</td>
              <td className="py-2 px-4">{rest.name}</td>
              <td className="py-2 px-4">{rest.owner?.name || "N/A"}</td>
              <td className="py-2 px-4">{rest.address?.city?.name || "N/A"}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => openEditModal(rest)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(rest.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {editing ? "Edit Restaurant" : "Create Restaurant"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Restaurant Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Owner ID"
            value={form.ownerId}
            onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <select
            value={form.cityId}
            onChange={(e) => setForm({ ...form, cityId: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            {editing ? "Update" : "Create"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
