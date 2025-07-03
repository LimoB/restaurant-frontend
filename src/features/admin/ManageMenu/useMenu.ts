import { useEffect, useState, useRef } from "react";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../services/menu";
import { fetchCategories } from "../../services/category";
import { fetchRestaurants } from "../../services/restaurants";
import toast from "react-hot-toast";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  ingredients?: string;
  image_url?: string;
  active: boolean;
  category?: { id: number; name: string };
  restaurant?: { id: number; name: string };
};

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [restaurants, setRestaurants] = useState<{ id: number; name: string }[]>([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    ingredients: "",
    image_url: "",
    category_id: 0,
    restaurant_id: 0,
    active: true,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const loadMenu = async () => {
    try {
      setLoading(true);
      const [menuData, categoryData, restaurantData] = await Promise.all([
        getMenuItems(),
        fetchCategories(),
        fetchRestaurants(),
      ]);
      const normalized = menuData.map((item: any) => ({
        ...item,
        price: Number(item.price),
      }));
      setMenuItems(normalized);
      setCategories(categoryData);
      setRestaurants(restaurantData);
    } catch {
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setForm({
      name: "",
      price: "",
      ingredients: "",
      image_url: "",
      category_id: categories[0]?.id || 0,
      restaurant_id: restaurants[0]?.id || 0,
      active: true,
    });
    setShowFormModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      price: String(item.price),
      ingredients: item.ingredients ?? "",
      image_url: item.image_url ?? "",
      category_id: item.category?.id || 0,
      restaurant_id: item.restaurant?.id || 0,
      active: item.active ?? true,
    });
    setShowFormModal(true);
  };

  const handleFormSubmit = async () => {
    const payload = {
      ...form,
      price: parseFloat(form.price),
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
    categories,
    restaurants,
  };
};
