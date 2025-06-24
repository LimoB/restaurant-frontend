import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../../context/CartContext";
import { useCartActions } from "../../hooks/useCartActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HeroSection from "./HeroSection";
import OffersSection from "./OffersSection";
import ProductShowcase from "./ProductShowcase";
import Testimonials from "./Testimonials";
import ReservationSection from "./ReservationSection";
import Footer from "./Footer";

import CartIcon from "../../components/CartIcon";
import CartPanel from "../../components/CartPanel";
import ConfirmModal from "../../components/ConfirmModal";
import type { Product } from "../../data/products";

interface RootState {
  auth: {
    user: any;
  };
}

const LandingPage = () => {
  const { cart } = useCart();
  const { addToCart, decrement } = useCartActions();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [showCartPanel, setShowCartPanel] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    console.log("LandingPage rendered", { cart, total, user, showConfirmModal });
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
    setOrderConfirmed(false);
    setShowConfirmModal(true);
  }, [cart.length]);

  const handleConfirmOrder = useCallback(() => {
    if (!user) {
      toast.error("Please log in to complete your order.");
      setShowConfirmModal(false);
      navigate("/login", { state: { from: "/confirm", cart, total } });
      return;
    }

    setOrderConfirmed(true);
    setShowCartPanel(false);
  }, [user, cart, total, navigate]);

  const handleCloseModal = useCallback(() => {
    setShowConfirmModal(false);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
        }}
      />

      {/* Semi-transparent Gradient Overlay */}
      <div className="absolute inset-0 z-10" style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }} />

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
          onConfirm={handleConfirmOrder}
          product={null}
          cart={cart}
          total={total}
          orderConfirmed={orderConfirmed}
        />
      </div>
    </div>
  );
};

export default LandingPage;
