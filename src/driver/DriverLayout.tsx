import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../features/auth/authSlice";
import { Menu, X } from "lucide-react";
import UserDropdown from "../components/UserDropdown";

export default function DriverLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("Driver");
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-orange-700 text-white shadow-lg">
        <div className="text-2xl font-bold tracking-wide">🚚 Limo Driver</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="." className="hover:text-yellow-300 transition">Dashboard</Link>
          <Link to="deliveries" className="hover:text-yellow-300 transition">My Deliveries</Link>
          <Link to="map" className="hover:text-yellow-300 transition">Route Map</Link>
          <UserDropdown name={name} onLogout={handleLogout} />
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-orange-700 text-white px-6 py-4 shadow-md rounded-b-xl space-y-2">
          <Link
            to="."
            onClick={() => setMenuOpen(false)}
            className="py-2 border-b border-orange-300 hover:text-yellow-300"
          >
            Dashboard
          </Link>
          <Link
            to="deliveries"
            onClick={() => setMenuOpen(false)}
            className="py-2 border-b border-orange-300 hover:text-yellow-300"
          >
            My Deliveries
          </Link>
          <Link
            to="map"
            onClick={() => setMenuOpen(false)}
            className="py-2 border-b border-orange-300 hover:text-yellow-300"
          >
            Route Map
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
