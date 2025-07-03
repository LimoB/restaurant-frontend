// components/ConfirmModal/ConfirmModal.tsx
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/ordersServices";

import ConfirmModalContent from "./ConfirmModalContent";
import ConfirmedMessage from "./ConfirmedMessage";
import ProductPrompt from "./ProductPrompt";

import type { RootState } from "../../store/store";
import type { CartItem } from "../../types/cart";
import type { OrderInput } from "../../types/order";
// import React = require("react");

type ConfirmModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  product?: { name: string } | null;
  cart?: CartItem[];
  total?: number;
};

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  product,
  cart = [],
  total = 0,
}: ConfirmModalProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { clearCart } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComment, setOrderComment] = useState("");
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const isLoggedIn = Boolean(user && token);
  const cartIsEmpty = cart.length === 0;
  const hasMultipleRestaurants = new Set(cart.map(item => item.restaurant_id)).size > 1;

  const isConfirmDisabled =
    !isLoggedIn || cartIsEmpty || isSubmitting || hasMultipleRestaurants;

  useEffect(() => {
    if (show) {
      console.log("🟢 ConfirmModal mounted. Cart items:", cart);
      console.log("🔍 User check:", { user, token, isLoggedIn });
    } else {
      console.log("🟥 ConfirmModal hidden");
    }
  }, [show]);

  useEffect(() => {
    if (isOrderConfirmed) {
      const timer = setTimeout(() => {
        onClose();
        setIsOrderConfirmed(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOrderConfirmed, onClose]);




  const handleDefaultConfirm = async () => {
    console.log("🧾 Attempting order confirmation...");

    if (!isLoggedIn || !user) {
      toast.error("You must log in to place an order.");
      return;
    }

    if (!user.id) {
      console.error("❌ user.id is undefined. User object:", user);
      toast.error("Missing user ID. Please log out and log back in.");
      return;
    }

    if (cartIsEmpty) {
      toast.error("Cart is empty. Add items before confirming.");
      return;
    }

    if (hasMultipleRestaurants) {
      toast.error("You can only order from one restaurant at a time.");
      return;
    }

    try {
      setIsSubmitting(true);

      const restaurantId = cart[0]?.restaurant_id;
      if (!restaurantId) {
        console.error("❌ No restaurant_id found in cart items.");
        toast.error("Invalid cart data. Try again.");
        return;
      }

      const addressId = (user as any)?.address_id ?? 1;

      const cartItems = cart.map(item => ({
        menu_item_id: Number(item.id),
        item_name: item.name,
        quantity: item.quantity,
        price: Number(item.price).toFixed(2),
        comment: item.comment ?? "",
      }));

      const orderPayload: OrderInput = {
        user_id: user.id, // ✅ now guaranteed to exist
        restaurant_id: restaurantId,
        delivery_address_id: Number(addressId),
        driver_id: null,
        price: total.toFixed(2),
        discount: "0",
        final_price: total.toFixed(2),
        comment: orderComment || "Order placed from UI",
        status: "pending",
        actual_delivery_time: new Date().toISOString(),
        cart: cartItems,
      };

      console.log("📤 Order Payload:", orderPayload);

      const createdOrder = await createOrder(orderPayload);

      if (!createdOrder || typeof createdOrder !== "object" || !("id" in createdOrder)) {
        console.error("❌ Order creation failed:", createdOrder);
        toast.error("Order creation failed. Please try again.");
        return;
      }

      toast.success("🎉 Order placed successfully!");
      clearCart();
      setIsOrderConfirmed(true);
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

            {isOrderConfirmed ? (
              <ConfirmedMessage onClose={onClose} />
            ) : product ? (
              <ProductPrompt product={product} />
            ) : (
              <ConfirmModalContent
                cart={cart}
                total={total}
                isConfirmDisabled={isConfirmDisabled}
                handleConfirm={handleConfirm}
                isSubmitting={isSubmitting}
                orderComment={orderComment}
                setOrderComment={setOrderComment}
                hasMultipleRestaurants={hasMultipleRestaurants}
                onClose={onClose}
                isLoggedIn={isLoggedIn}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
