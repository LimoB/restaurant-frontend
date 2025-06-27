// components/ConfirmModal/OrderSummaryView.tsx
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import type { CartItem } from "../../types/cart";

interface Props {
  cart: CartItem[];
  total: number;
  orderComment: string;
  setOrderComment: (value: string) => void;
  isConfirmDisabled: boolean;
  handleConfirm: () => void;
  onClose: () => void;
  isSubmitting: boolean;
  isLoggedIn: boolean;
  hasMultipleRestaurants: boolean;
}

const OrderSummaryView = ({
  cart,
  total,
  orderComment,
  setOrderComment,
  isConfirmDisabled,
  handleConfirm,
  onClose,
  isSubmitting,
  isLoggedIn,
  hasMultipleRestaurants,
}: Props) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Confirm Your Order</h2>

      {cart.length > 0 ? (
        <div className="rounded-xl border border-blue-200 bg-white p-4 text-sm text-left max-h-48 overflow-y-auto shadow-inner">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-1 border-b last:border-none">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-3 pt-2 border-t border-gray-300">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      )}

      <div className="mt-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Add a comment or special request:
        </label>
        <textarea
          id="comment"
          rows={3}
          value={orderComment}
          onChange={(e) => setOrderComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          placeholder="e.g., No onions, extra spicy..."
        />
      </div>

      {hasMultipleRestaurants && (
        <p className="text-sm text-red-600 mt-3">
          ⚠️ You can only place an order from one restaurant at a time.
        </p>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleConfirm}
          disabled={isConfirmDisabled}
          className={`w-1/2 py-2 rounded-xl text-white font-medium transition ${isConfirmDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={16} /> Placing...
            </span>
          ) : (
            "Confirm"
          )}
        </button>
        <button
          onClick={onClose}
          className="w-1/2 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition"
        >
          Cancel
        </button>
      </div>

      {!isLoggedIn && cart.length > 0 && (
        <p className="mt-4 text-sm text-red-600 text-center">
          Please <Link to="/login" className="underline text-blue-600 hover:text-blue-700 font-medium">log in</Link> to complete your order.
        </p>
      )}
    </>
  );
};

export default OrderSummaryView;
