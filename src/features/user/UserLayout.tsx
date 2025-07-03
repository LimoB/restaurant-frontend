import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../features/auth/authSlice";
import UserDropdown from "../components/UserDropdown";
import { Menu, X } from "lucide-react";
import FloatingCartHandler from "../components/FloatingCartHandler";
import CartButton from "../components/CartButton"; // ✅ Import your reusable button
// import { useFloatingCart } from "../hooks/useFloatingCart"; // ✅ Optional shared hook

export default function UserLayout() {
  const [name, setName] = useState("User");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

//   const { openCart } = useFloatingCart(); // ✅ Pull in cart open function

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fff9f2] flex flex-col">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-orange-700 text-white shadow-lg">
        <div className="text-2xl font-bold tracking-wide">🍽️ Limo Restaurant</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="." className="hover:text-yellow-300 transition">Home</Link>
          <Link to="orders" className="hover:text-yellow-300 transition">My Orders</Link>
          <Link to="menu" className="hover:text-yellow-300 transition">Menu</Link>
          <UserDropdown name={name} onLogout={handleLogout} />
        </nav>

        {/* Mobile Toggle Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-orange-700 text-white px-6 py-4 shadow-md rounded-b-xl space-y-2">
          <Link
            to="."
            className="py-2 border-b border-orange-300 hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="orders"
            className="py-2 border-b border-orange-300 hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            My Orders
          </Link>
          <Link
            to="menu"
            className="py-2 border-b border-orange-300 hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </Link>

          {/* ✅ Insert Cart Button here */}
          <div className="py-2">
            <CartButton
              onClick={() => {
                setMenuOpen(false);
                // openCart(); // Open cart panel
              }}
            />
          </div>

          <div className="py-2">
            <UserDropdown name={name} onLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 px-6 py-8 md:px-12 bg-[#fffaf0]">
        <Outlet />
      </main>

      {/* Floating Cart Handler (manages panel and modal) */}
      <FloatingCartHandler />
    </div>
  );
}
