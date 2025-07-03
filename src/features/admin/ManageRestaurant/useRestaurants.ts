// src/admin/restaurants/useRestaurants.ts
import { useEffect, useState } from "react";
import {
  fetchRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  fetchRestaurantsByCity,
} from "@/services/restaurants";
import { fetchCities } from "@/services/city";

export interface Restaurant {
  id: number;
  name: string;
  owner?: { name: string; id: number };
  address?: { city?: { name: string; id: number } };
}

export interface City {
  id: number;
  name: string;
}

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<number | "all">("all");

  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Restaurant | null>(null);
  const [form, setForm] = useState({ name: "", ownerId: "", cityId: "" });

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    loadRestaurants();
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
    if (!form.name || !form.ownerId || !form.cityId) {
      alert("All fields required");
      return;
    }

    try {
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

  return {
    restaurants,
    cities,
    selectedCity,
    setSelectedCity,
    isModalOpen,
    setModalOpen,
    editing,
    form,
    setForm,
    openCreateModal,
    openEditModal,
    handleSave,
    handleDelete,
  };
}
