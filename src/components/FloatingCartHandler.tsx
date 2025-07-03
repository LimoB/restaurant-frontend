import { useState } from "react";
import CartButton from "@/components/CartButton";
import CartPanel from "@/components/CartPanel";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import { useCart } from "@/context/CartContext";

const FloatingCartHandler = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const handleOrderNowClick = () => {
    setShowConfirmModal(true);
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
        product={null}
        cart={cart}
        total={total}
      />
    </>
  );
};

export default FloatingCartHandler;
