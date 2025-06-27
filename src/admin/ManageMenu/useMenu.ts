import { useEffect, useState, useRef } from "react";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../services/menu";
import toast from "react-hot-toast";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  ingredients?: string;
  image_url?: string;
  category?: { name: string };
  restaurant?: { name: string };
};

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    ingredients: "",
    image_url: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const loadMenu = async () => {
    try {
      setLoading(true);
      const data = await getMenuItems();
      const normalized = data.map((item: any) => ({
        ...item,
        price: Number(item.price),
      }));
      setMenuItems(normalized);
    } catch {
      toast.error("Failed to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setForm({ name: "", price: "", ingredients: "", image_url: "" });
    setShowFormModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      price: String(item.price),
      ingredients: item.ingredients ?? "",
      image_url: item.image_url ?? "",
    });
    setShowFormModal(true);
  };

  const handleFormSubmit = async () => {
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      ingredients: form.ingredients,
      image_url: form.image_url,
    };

    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, payload);
        toast.success("Menu item updated.");
      } else {
        await createMenuItem(payload);
        toast.success("Menu item created.");
      }
      setShowFormModal(false);
      await loadMenu();
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch {
      toast.error("Failed to save menu item.");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMenuItem(deletingId);
      toast.success("Menu item deleted.");
      setShowDeleteModal(false);
      setDeletingId(null);
      await loadMenu();
    } catch {
      toast.error("Failed to delete menu item.");
    }
  };

  return {
    menuItems,
    loading,
    form,
    editingItem,
    showFormModal,
    showDeleteModal,
    deletingId,
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
};
