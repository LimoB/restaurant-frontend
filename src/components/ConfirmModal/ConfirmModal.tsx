// components/ConfirmModal/ConfirmModal.tsx
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/ordersServices";
import ConfirmedView from "./ConfirmedView";
import ProductPromptView from "./ProductPromptView";
import OrderSummaryView from "./OrderSummaryView";
import type { ConfirmModalProps } from "./types";
import type { RootState } from "../../store/store";
import toast from "react-hot-toast";
import type { OrderInput } from "../../types/order";

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
      const restaurantId = cart[0]?.restaurant_id ?? 1;

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

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-gradient-to-br from-purple-50 to-blue-100 shadow-2xl rounded-3xl p-6 sm:p-8 animate-fade-in overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {orderConfirmed ? (
          <ConfirmedView onClose={onClose} />
        ) : product ? (
          <ProductPromptView product={product} />
        ) : (
          <OrderSummaryView
            cart={cart}
            total={total}
            orderComment={orderComment}
            setOrderComment={setOrderComment}
            isConfirmDisabled={isConfirmDisabled}
            handleConfirm={handleConfirm}
            onClose={onClose}
            isSubmitting={isSubmitting}
            isLoggedIn={isLoggedIn}
            hasMultipleRestaurants={hasMultipleRestaurants}
          />
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;
