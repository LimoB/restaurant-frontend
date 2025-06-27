import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { X, Loader } from "lucide-react";
import { createOrder } from "../services/ordersServices";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { RootState } from "../store/store";
import type { CartItem } from "../types/cart";
import type { OrderInput } from "../types/order";

type ConfirmModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  product?: { name: string } | null;
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
  const { clearCart } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComment, setOrderComment] = useState("");

  const isLoggedIn = Boolean(user && token);
  const cartIsEmpty = cart.length === 0;
  const restaurantIds = new Set(cart.map((item) => item.restaurant_id));
  const hasMultipleRestaurants = restaurantIds.size > 1;

  const isConfirmDisabled =
    !isLoggedIn || cartIsEmpty || isSubmitting || hasMultipleRestaurants;

  useEffect(() => {
    console.log(show ? "🟢 ConfirmModal mounted. Cart items:" : "🟥 ConfirmModal hidden", cart);
  }, [show]);

  const handleDefaultConfirm = async () => {
    if (!isLoggedIn || !user) {
      toast.error("You must log in to place an order.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty. Add items before confirming.");
      return;
    }

    if (hasMultipleRestaurants) {
      toast.error("You can only order from one restaurant at a time.");
      return;
    }

    try {
      setIsSubmitting(true);

      const restaurantId: number = cart[0]?.restaurant_id ?? 1;

      const cartItems = cart.map((item) => ({
        menu_item_id: Number(item.id),
        item_name: item.name,
        quantity: item.quantity,
        price: item.price.toFixed(2),
        comment: item.comment ?? "",
      }));

      const orderPayload: OrderInput = {
        user_id: user.id,
        restaurant_id: restaurantId,
        delivery_address_id: Number((user as any).address_id ?? 1),
        driver_id: null,
        price: total.toFixed(2),
        discount: "0",
        final_price: total.toFixed(2),
        comment: orderComment || "Order placed from UI",
        status: "pending",
        actual_delivery_time: new Date().toISOString(),
        cart: cartItems,
      };

      const createdOrder = await createOrder(orderPayload);

      if (!createdOrder || typeof createdOrder !== "object" || !("id" in createdOrder)) {
        toast.error("Order creation failed. Please try again.");
        return;
      }

      toast.success("🎉 Order placed successfully!");
      clearCart();
      onClose();
    } catch (error) {
      console.error("❌ Error placing order:", error);
      toast.error("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = onConfirm ?? handleDefaultConfirm;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-gradient-to-br from-purple-50 to-blue-100 shadow-2xl rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {orderConfirmed ? (
              <>
                <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
                <p className="text-gray-700">Thank you for your order. Your food is on the way!</p>
                <button
                  onClick={onClose}
                  className="mt-6 w-full py-2 px-4 rounded-xl text-white bg-green-600 hover:bg-green-700 transition font-semibold"
                >
                  Close
                </button>
              </>
            ) : product ? (
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add <span className="text-indigo-600 font-bold">{product.name}</span> to your cart?
              </h2>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-5">Confirm Your Order</h2>

                {!cartIsEmpty ? (
                  <div className="rounded-xl border border-blue-200 bg-white p-4 text-sm text-left max-h-48 overflow-y-auto shadow-inner">
                    {cart.map((item: CartItem) => (
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

                {!isLoggedIn && !cartIsEmpty && (
                  <p className="mt-4 text-sm text-red-600 text-center">
                    Please{" "}
                    <Link
                      to="/login"
                      onClick={onClose}
                      className="underline text-blue-600 hover:text-blue-700 font-medium"
                    >
                      log in
                    </Link>{" "}
                    to complete your order.
                  </p>
                )}

              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
