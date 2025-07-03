import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

type CartButtonProps = {
  onClick: () => void;
};

const CartButton = ({ onClick }: CartButtonProps) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-full shadow-xl z-50 flex items-center gap-2 text-base"
    >
      <ShoppingCart size={20} />
      {totalItems === 0 ? "View Cart" : `${totalItems} item${totalItems > 1 ? "s" : ""}`}
    </button>
  );
};

export default CartButton;
