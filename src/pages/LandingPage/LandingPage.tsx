import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../../context/CartContext";
import { useCartActions } from "../../hooks/useCartActions";
import toast from "react-hot-toast";

// Sections
import HeroSection from "./HeroSection";
import OffersSection from "./OffersSection";
import ProductShowcase from "./ProductShowcase";
import Testimonials from "./Testimonials";
import ReservationSection from "./ReservationSection";
import AboutSection from "./AboutSection"; // ✅ Import added
import Footer from "./Footer";

// Components
import CartPanel from "../../components/CartPanel";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import type { Product } from "../../types/product";
import type { CartItem } from "../../types/cart";

interface RootState {
  auth: {
    user: {
      id: number;
      name: string;
      email?: string;
      address_id?: number;
    } | null;
  };
}

const LandingPage = () => {
  const { cart } = useCart();
  const { addToCart, decrement } = useCartActions();
  const user = useSelector((state: RootState) => state.auth.user);

  const [showCartPanel, setShowCartPanel] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  useEffect(() => {
    console.log("📦 LandingPage mounted", {
      cart,
      total,
      user,
      showConfirmModal,
    });
  }, [cart, total, user, showConfirmModal]);

  const getQuantity = useCallback(
    (id: string) => cart.find((item) => item.id === id)?.quantity ?? 0,
    [cart]
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product);
    },
    [addToCart]
  );

  const handleOrderNowClick = useCallback(() => {
    if (cart.length === 0) {
      toast.error("🛒 Your cart is empty.");
      return;
    }
    setShowConfirmModal(true);
  }, [cart]);

  const handleCloseModal = useCallback(() => {
    setShowConfirmModal(false);
  }, []);

  const normalizedCart: CartItem[] = cart.map((item) => ({
    ...item,
    comment: (item as any).comment ?? "",
  }));

  return (
    <>
      <HeroSection />
      <OffersSection />

      <div id="menu-section">
        <ProductShowcase
          getQuantity={getQuantity}
          addToCart={handleAddToCart}
          decrement={decrement}
          onOrderNowClick={handleOrderNowClick}
        />
      </div>

      <Testimonials />
      <ReservationSection />

     {/* ✅ About section with ID */}
      <div id="about">
        <AboutSection />
      </div>

      <div id="footer">
        <Footer />
      </div>

      <CartPanel
        open={showCartPanel}
        onClose={() => setShowCartPanel(false)}
        onOrderNowClick={handleOrderNowClick}
      />

      <ConfirmModal
        show={showConfirmModal}
        onClose={handleCloseModal}
        product={null}
        cart={normalizedCart}
        total={total}
      />
    </>
  );
};

export default LandingPage;
