import { useEffect, useRef, useState, useMemo } from "react";
import {
  fetchStates,
  createState,
  updateState,
  deleteState,
} from "@/services/state";
import toast from "react-hot-toast";

export interface State {
  id: number;
  name: string;
  code: string;
}

export function useStates() {
  const [states, setStates] = useState<State[]>([]);
  const [form, setForm] = useState({ name: "", code: "" });
  const [editingState, setEditingState] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchStates();
        setStates(data);
      } catch (err) {
        console.error("Failed to load states", err);
        toast.error("Failed to load states");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openAdd = () => {
    setForm({ name: "", code: "" });
    setEditingState(null);
    setShowFormModal(true);
  };

  const openEdit = (item: State) => {
    setEditingState(item);
    setForm({ name: item.name, code: item.code });
    setShowFormModal(true);
  };

  const handleFormSubmit = async () => {
    if (form.name.trim() === "" || form.code.trim() === "") {
      toast.error("Both state name and code are required");
      return;
    }

    try {
      if (editingState) {
        const updated = await updateState(editingState.id, form);
        setStates((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        toast.success("State updated");
      } else {
        const created = await createState(form);
        setStates((prev) => [...prev, created]);
        toast.success("State created");
      }

      setShowFormModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit state");
    }
  };

  const handleInlineUpdate = async (id: number, data: { name: string; code: string }) => {
    try {
      const updated = await updateState(id, data);
      setStates((prev) => prev.map((s) => (s.id === id ? updated : s)));
      toast.success("State updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update state");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteState(deletingId);
      setStates((prev) => prev.filter((s) => s.id !== deletingId));
      toast.success("State deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete state");
    }
  };

  const filteredStates = useMemo(() => {
    const q = search.toLowerCase();
    return states.filter((s) =>
      s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    );
  }, [search, states]);

  return {
    states: filteredStates,
    allStates: states,
    totalCount: states.length,
    loading,
    form,
    editingState,
    showFormModal,
    showDeleteModal,
    scrollRef,
    search,
    setSearch,
    openAdd,
    openEdit,
    setForm,
    setShowFormModal,
    setShowDeleteModal,
    setDeletingId,
    handleFormSubmit,
    handleDelete,
    handleInlineUpdate,
  };
}
