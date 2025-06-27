// src/context/CartContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "../types/product";

// ✅ Extend Product for cart with necessary fields
export type CartItem = Omit<Product, "price"> & {
  quantity: number;
  restaurant_id: number;
  price: string; // as required by OrderInput
};

type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: string }
  | { type: "INCREMENT"; payload: string }
  | { type: "DECREMENT"; payload: string }
  | { type: "CLEAR" };

type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  clearCart: () => void;
};

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const restaurantId =
        typeof action.payload.restaurant?.id === "number"
          ? action.payload.restaurant.id
          : action.payload.restaurant_id ?? 0;

      return [
        ...state,
        {
          ...action.payload,
          quantity: 1,
          restaurant_id: restaurantId,
          price: String(action.payload.price), // Ensure price is string
        },
      ];
    }

    case "INCREMENT":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREMENT":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR":
      return [];

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider missing");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider value={{ cart, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
