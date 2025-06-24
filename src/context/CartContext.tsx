// src/context/CartContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: string }
  | { type: "INCREMENT"; payload: string }
  | { type: "DECREMENT"; payload: string }
  | { type: "CLEAR" };

type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD": {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
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

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
