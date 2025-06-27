import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import CartButton from "../components/CartButton";
import CartPanel from "../components/CartPanel";
import ConfirmModal from "../components/ConfirmOrderModal";
import { useCart } from "../context/CartContext";

interface Props {
    children: ReactNode;
}

const PublicLayout = ({ children }: Props) => {
    const { pathname } = useLocation();
    const showNavbar = pathname !== "/menu";
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { cart } = useCart();

    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);
    const openConfirm = () => setConfirmOpen(true);
    const closeConfirm = () => setConfirmOpen(false);

    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const handleOrderNowClick = () => {
        closeCart();
        openConfirm();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-200 via-fuchsia-100 to-indigo-200">
            {showNavbar && (
                <header className="bg-white/80 backdrop-blur shadow-md p-4 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-2xl font-extrabold text-orange-600 tracking-wide"
                        >
                            <FaUtensils className="text-orange-500" />
                            <span>MyRestaurant</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
                            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
                            <a href="#menu-section" className="hover:text-orange-500 transition-colors">Menu</a>
                            <Link to="/about" className="hover:text-orange-500 transition-colors">About</Link>
                            <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
                            <Link to="/login" className="hover:text-orange-500 transition-colors">Sign In</Link>
                            <Link to="/register" className="hover:text-orange-500 transition-colors">Register</Link>
                            <div className="ml-4">
                                <CartButton onClick={openCart} />
                            </div>
                        </nav>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-gray-700 hover:text-orange-500 transition"
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>

                    {isOpen && (
                        <div className="md:hidden mt-4 flex flex-col gap-3 text-sm font-medium text-gray-700 px-2">
                            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Home</Link>
                            <a href="#menu-section" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Menu</a>
                            <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-orange-500">About</Link>
                            <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Contact</Link>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Sign In</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Register</Link>
                            <div className="pt-2">
                                <CartButton onClick={openCart} />
                            </div>
                        </div>
                    )}
                </header>
            )}

            <main className="flex-grow">{children}</main>

            {/* Cart Panel */}
            <CartPanel
                open={cartOpen}
                onClose={closeCart}
                onOrderNowClick={handleOrderNowClick}
            />

            {/* Confirm Modal */}
            <ConfirmModal
                show={confirmOpen}
                onClose={closeConfirm}
                cart={cart}
                total={total}
            />
        </div>
    );
};

export default PublicLayout;
