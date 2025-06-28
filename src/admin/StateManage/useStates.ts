import { useEffect, useRef, useState } from "react";
import {
  fetchStates,
  createState,
  updateState,
  deleteState,
} from "../../services/state";

export interface State {
  id: number;
  name: string;
}

export function useStates() {
  const [states, setStates] = useState<State[]>([]);
  const [form, setForm] = useState({ name: "" });
  const [editingState, setEditingState] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchStates();
        setStates(data);
      } catch (err) {
        console.error("Failed to load states", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openAdd = () => {
    setForm({ name: "" });
    setEditingState(null);
    setShowFormModal(true);
  };

  const openEdit = (item: State) => {
    setEditingState(item);
    setForm({ name: item.name });
    setShowFormModal(true);
  };

  const handleFormSubmit = async () => {
    if (form.name.trim() === "") throw new Error("State name is required");

    if (editingState) {
      const updated = await updateState(editingState.id, form);
      setStates((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    } else {
      const created = await createState(form);
      setStates((prev) => [...prev, created]);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteState(deletingId);
    setStates((prev) => prev.filter((s) => s.id !== deletingId));
  };

  return {
    states,
    loading,
    form,
    editingState,
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