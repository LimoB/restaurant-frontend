import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger + Close icons

interface Props {
    children: ReactNode;
}

const PublicLayout = ({ children }: Props) => {
    const { pathname } = useLocation();
    const showNavbar = pathname !== "/menu";
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-200 via-fuchsia-100 to-indigo-200">
            {showNavbar && (
                <header className="bg-white/80 backdrop-blur shadow-md p-4 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Logo on the left */}
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-2xl font-extrabold text-orange-600 tracking-wide"
                        >
                            <FaUtensils className="text-orange-500" />
                            <span>MyRestaurant</span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
                            <Link to="/" className="hover:text-orange-500 transition-colors">
                                Home
                            </Link>
                            <a href="#menu-section" className="hover:text-orange-500 transition-colors">
                                Menu
                            </a>
                            <Link to="/about" className="hover:text-orange-500 transition-colors">
                                About
                            </Link>
                            <Link to="/contact" className="hover:text-orange-500 transition-colors">
                                Contact
                            </Link>
                            <Link to="/login" className="hover:text-orange-500 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/register" className="hover:text-orange-500 transition-colors">
                                Register
                            </Link>
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-gray-700 hover:text-orange-500 transition"
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden mt-4 flex flex-col gap-3 text-sm font-medium text-gray-700 px-2">
                            <Link to="/" className="hover:text-orange-500" onClick={() => setIsOpen(false)}>
                                Home
                            </Link>
                            <a href="#menu-section" className="hover:text-orange-500" onClick={() => setIsOpen(false)}>
                                Menu
                            </a>
                            <Link to="/about" className="hover:text-orange-500" onClick={() => setIsOpen(false)}>
                                About
                            </Link>
                            <Link to="/contact" className="hover:text-orange-500" onClick={() => setIsOpen(false)}>
                                Contact
                            </Link>
                            <Link to="/login" className="hover:text-orange-500" onClick={() => setIsOpen(false)}>
                                Sign In
                            </Link>
                            <Link to="/register" className="hover:text-orange-500" onClick={() => setIsOpen(false)}>
                                Register
                            </Link>
                        </div>
                    )}
                </header>
            )}

            {/* Page Content */}
            <main className="flex-grow">{children}</main>
        </div>
    );
};

export default PublicLayout;
