import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const CartIcon = ({ onClick }: { onClick: () => void }) => {
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="fixed top-6 right-6 bg-orange-600 text-white p-3 rounded-full shadow-lg z-40 relative"
    >
      <ShoppingCart size={24} />
      {totalQty > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {totalQty}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
