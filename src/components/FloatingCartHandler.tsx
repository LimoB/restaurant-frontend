import { useState } from "react";
import CartButton from "./CartButton";
import CartPanel from "./CartPanel";
import ConfirmModal from "./ConfirmOrderModal";
import { useCart } from "../context/CartContext";
import { useCartActions } from "../hooks/useCartActions";

const FloatingCartHandler = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const { cart } = useCart();
  const { clearCart } = useCartActions();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const handleOrderNowClick = () => {
    setShowConfirmModal(true);
    setOrderConfirmed(false);
  };

  const handleConfirmOrder = () => {
    clearCart();
    setOrderConfirmed(true);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    closeCart();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <CartButton onClick={openCart} />
      </div>

      <CartPanel
        open={cartOpen}
        onClose={closeCart}
        onOrderNowClick={handleOrderNowClick}
      />

      <ConfirmModal
        show={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmOrder}
        product={null}
        cart={cart}
        total={total}
        orderConfirmed={orderConfirmed}
      />
    </>
  );
};

export default FloatingCartHandler;
