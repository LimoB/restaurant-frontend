import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import type { RootState } from "../store/store";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type ConfirmModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: { name: string } | null;
  cart?: CartItem[];
  total?: number;
  orderConfirmed?: boolean;
};

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  product,
  cart = [],
  total = 0,
  orderConfirmed = false,
}: ConfirmModalProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const isLoggedIn = Boolean(user && token);
  const cartIsEmpty = cart.length === 0;
  const isConfirmDisabled = !isLoggedIn || cartIsEmpty;

  if (!show) return null;

  const handleConfirm = () => {
    if (!isLoggedIn) {
      toast.error("You must log in to place an order.");
      return;
    }

    try {
      onConfirm();
    } catch (err) {
      console.error("❌ Error during confirmation:", err);
      toast.error("Something went wrong while confirming the order.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-gradient-to-br from-purple-50 to-blue-100 shadow-2xl rounded-3xl p-6 sm:p-8 animate-fade-in overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Order Confirmed */}
        {orderConfirmed ? (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
            <p className="text-gray-700">
              Thank you for your order. Your food is on the way!
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2 px-4 rounded-xl text-white bg-green-600 hover:bg-green-700 transition font-semibold"
            >
              Close
            </button>
          </>
        ) : product ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add <span className="text-indigo-600 font-bold">{product.name}</span> to your cart?
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-5">Confirm Your Order</h2>

            {!cartIsEmpty ? (
              <div className="rounded-xl border border-blue-200 bg-white p-4 text-sm text-left max-h-48 overflow-y-auto shadow-inner">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-1 border-b last:border-none"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
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

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
                className={`w-1/2 py-2 rounded-xl text-white font-medium transition ${
                  isConfirmDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="w-1/2 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition"
              >
                Cancel
              </button>
            </div>

            {/* Login Prompt */}
            {!isLoggedIn && !cartIsEmpty && (
              <p className="mt-4 text-sm text-red-600 text-center">
                Please{" "}
                <Link
                  to="/login"
                  className="underline text-blue-600 hover:text-blue-700 font-medium"
                >
                  log in
                </Link>{" "}
                to complete your order.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;
