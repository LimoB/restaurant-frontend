import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { logout } from "@/features/auth/authSlice";
import { Menu, X } from "lucide-react";
import UserDropdown from "@/components/UserDropdown";

export default function OwnerLayout() {
  const [name, setName] = useState("Owner");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-orange-700 text-white shadow-lg">
        <div className="text-2xl font-bold tracking-wide">🍽️ Owner Dashboard</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="." className="hover:text-yellow-300 transition">Dashboard</Link>
          <Link to="restaurants" className="hover:text-yellow-300 transition">My Restaurants</Link>
          <Link to="menu" className="hover:text-yellow-300 transition">Menu</Link>
          <UserDropdown name={name} onLogout={handleLogout} />
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Dropdown */}
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
            to="restaurants"
            className="py-2 border-b border-orange-300 hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            My Restaurants
          </Link>
          <Link
            to="menu"
            className="py-2 border-b border-orange-300 hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </Link>
          <div className="py-2">
            <UserDropdown name={name} onLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1 px-6 py-8 md:px-12 bg-[#fffaf0]">
        <Outlet />
      </main>
    </div>
  );
}
