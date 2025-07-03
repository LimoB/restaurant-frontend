import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import CartButton from "@/components/CartButton";
import CartPanel from "@/components/CartPanel";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import { useCart } from "@/context/CartContext";

const PublicLayout = () => {
  const { pathname } = useLocation();
  const showNavbar = pathname !== "/menu";

  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { cart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);

  const handleOrderNowClick = () => {
    closeCart();
    openConfirm();
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0" />

      {/* Page content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {showNavbar && (
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-md p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center space-x-2 text-2xl font-extrabold text-orange-600 tracking-wide"
              >
                <FaUtensils className="text-orange-500" />
                <span>MyRestaurant</span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
                <Link to="/" className="hover:text-orange-500">Home</Link>
                <a href="#menu-section" className="hover:text-orange-500">Menu</a>
                <a href="#about" className="hover:text-orange-500">About</a>
                <a href="#footer" className="hover:text-orange-500">Contact</a>
                <Link to="/login" className="hover:text-orange-500">Sign In</Link>
                <Link to="/register" className="hover:text-orange-500">Register</Link>
                {/* <CartButton onClick={openCart} /> */}
              </nav>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-gray-700 hover:text-orange-500"
              >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>

            {isOpen && (
              <div className="md:hidden mt-4 flex flex-col gap-3 text-sm text-gray-700 px-2">
                <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Home</Link>
                <a href="#menu-section" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Menu</a>
                <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-orange-500">About</a>
                <a href="#footer" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Contact</a>
                <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Sign In</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Register</Link>
                <CartButton onClick={openCart} />
              </div>
            )}
          </header>
        )}

        {/* Routed content */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Modals */}
        <CartPanel
          open={cartOpen}
          onClose={closeCart}
          onOrderNowClick={handleOrderNowClick}
        />
        <ConfirmModal
          show={confirmOpen}
          onClose={closeConfirm}
          cart={cart}
          total={total}
        />
      </div>
    </div>
  );
};

export default PublicLayout;
