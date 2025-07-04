import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import type { Product } from "@/types/product";


export const useCartActions = () => {
  const { dispatch } = useCart();

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD", payload: product });
    toast.success(`${product.name} added to cart`, { id: product.id });
  };

  const increment = (id: string) => {
    dispatch({ type: "INCREMENT", payload: id });
  };

  const decrement = (id: string) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE", payload: id });
    toast("Item removed", { icon: "🗑️" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
    toast.success("Cart cleared");
  };

  return {
    addToCart,
    increment,
    decrement,
    removeFromCart,
    clearCart,
  };
};
