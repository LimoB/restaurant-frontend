// components/CartPanel.tsx
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";

const CartPanel = ({
  open,
  onClose,
  onOrderNowClick,
}: {
  open: boolean;
  onClose: () => void;
  onOrderNowClick: () => void;
}) => {
  const { cart } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  // const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);


  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
      if (
        document.activeElement instanceof HTMLElement &&
        panel.contains(document.activeElement)
      ) {
        document.activeElement.blur();
      }
    }
  }, [open]);

  return (
    <div
      ref={panelRef}
      className={`fixed top-0 right-0 w-full sm:w-80 h-full z-50 bg-gradient-to-br from-white via-blue-50 to-purple-100 shadow-2xl p-5 transition-transform duration-300 ease-in-out transform ${open ? "translate-x-0" : "translate-x-full"
        }`}
      aria-hidden={!open}
      role="dialog"
      aria-label="Shopping Cart Panel"
    >



      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-700">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
          aria-label="Close cart panel"
        >
          <X size={20} />
        </button>
      </div>



      {/* Cart Items */}
      <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-1">
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start text-sm bg-white p-3 rounded-xl shadow-sm border border-gray-100"
            >
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="font-semibold text-gray-700">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      <hr className="my-5 border-blue-100" />

      <div className="flex justify-between items-center text-base font-semibold text-indigo-800 mb-5">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => {
          console.log("🧡 CartPanel Order Now clicked");
          onOrderNowClick();
        }}
        className="w-full text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={cart.length === 0}
      >
        Order Now
      </button>
    </div>
  );
};

export default CartPanel;
