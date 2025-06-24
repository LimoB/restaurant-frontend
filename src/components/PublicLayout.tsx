import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { FaUtensils } from "react-icons/fa"; // Restaurant icon

interface Props {
    children: ReactNode;
}

const PublicLayout = ({ children }: Props) => {
    const { pathname } = useLocation();
    const showNavbar = pathname !== "/menu";

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-200 via-fuchsia-100 to-indigo-200">
            {/* Navbar */}
            {showNavbar && (
                <header className="bg-white/80 backdrop-blur shadow-md p-4 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Left-aligned Logo */}
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-2xl font-extrabold text-orange-600 tracking-wide"
                        >
                            <FaUtensils className="text-orange-500" />
                            <span>MyRestaurant</span>
                        </Link>

                        {/* Right-aligned Nav */}
                        <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
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
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main className="flex-grow">{children}</main>
        </div>
    );
};

export default PublicLayout;
