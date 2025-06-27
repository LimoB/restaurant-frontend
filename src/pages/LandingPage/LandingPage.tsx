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
import Footer from "./Footer";

// Components
import CartIcon from "../../components/CartIcon";
import CartPanel from "../../components/CartPanel";
import ConfirmModal from "../../components/ConfirmOrderModal";
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
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
      setShowCartPanel(true);
    },
    [addToCart]
  );

  const handleOrderNowClick = useCallback(() => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    console.log("🧡 CartPanel Order Now clicked");
    setOrderConfirmed(false);
    setShowConfirmModal(true);
  }, [cart]);

  const handleCloseModal = useCallback(() => {
    console.log("🟥 ConfirmModal hidden");
    setShowConfirmModal(false);
  }, []);

  // 🛠 Normalize cart to ensure all items include a `comment`
  const normalizedCart: CartItem[] = cart.map((item) => ({
    ...item,
    comment: (item as any).comment ?? "", // ⚠️ Not ideal long-term
  }));


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
        }}
      />

      {/* Semi-transparent Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col min-h-screen backdrop-blur-sm">
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
        <Footer />

        <CartIcon onClick={() => setShowCartPanel(true)} />

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
          orderConfirmed={orderConfirmed}
        />
      </div>
    </div>
  );
};

export default LandingPage;
