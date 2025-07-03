import { useEffect, useRef, useState } from "react";
import {
  fetchCities,
  createCity,
  updateCity,
  deleteCity,
} from "@/services/city";
import { fetchStates } from "@/services/state"; // Assuming this exists

export interface City {
  id: number;
  name: string;
  state_id: number;
  state?: { name: string };
}

export function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<{ id: number; name: string }[]>([]);
  const [form, setForm] = useState({ name: "", state_id: 0 });
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [citiesData, statesData] = await Promise.all([
          fetchCities(),
          fetchStates(),
        ]);
        setCities(citiesData);
        setStates(statesData);
      } catch (err) {
        console.error("Failed to load cities/states", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openAdd = () => {
    setForm({ name: "", state_id: states[0]?.id || 0 });
    setEditingCity(null);
    setShowFormModal(true);
  };

  const openEdit = (item: City) => {
    setEditingCity(item);
    setForm({ name: item.name, state_id: item.state_id });
    setShowFormModal(true);
  };

  const handleFormSubmit = async () => {
  if (form.name.trim() === "") throw new Error("City name is required");

  const payload = {
    name: form.name,
    stateId: form.state_id, // ✅ Convert snake_case to camelCase
  };

  if (editingCity) {
    const updated = await updateCity(editingCity.id, payload);
    setCities((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  } else {
    const created = await createCity(payload);
    setCities((prev) => [...prev, created]);
  }
};

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteCity(deletingId);
    setCities((prev) => prev.filter((c) => c.id !== deletingId));
  };

  return {
    cities,
    states,
    loading,
    form,
    editingCity,
    showFormModal,
    showDeleteModal,
    scrollRef,
    openAdd,
    openEdit,
    setForm,
    setShowFormModal,
    setShowDeleteModal,
    setDeletingId,
    handleFormSubmit,
    handleDelete,
  };
}