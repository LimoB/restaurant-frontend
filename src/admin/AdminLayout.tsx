import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LogOut, User, Settings } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fffaf0] text-[#442c1c] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#93512c] to-[#7b3e19] text-white p-6 hidden md:block shadow-lg">
        <h2 className="text-2xl font-extrabold mb-8 tracking-wide">🍽️ Admin Panel</h2>
        <nav className="space-y-4 text-base font-medium">
          <Link to="/admin" className="block hover:text-yellow-300 transition">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block hover:text-yellow-300 transition">
            Users
          </Link>
          <Link to="/admin/restaurants" className="block hover:text-yellow-300 transition">
            Restaurants
          </Link>
          <Link to="/admin/orders" className="block hover:text-yellow-300 transition">
            Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#93512c] text-white shadow-md">
          <h1 className="text-xl font-semibold tracking-wide">Admin Dashboard</h1>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 hover:text-yellow-200 transition-colors"
            >
              <User size={20} />
              <span className="font-medium">Admin</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#fff3e0] text-[#5b2c0f] rounded-xl shadow-xl z-50 overflow-hidden border border-[#93512c]">
                <Link
                  to="/admin/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-[#f5e1c8] transition"
                >
                  My Profile
                </Link>
                <Link
                  to="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-[#f5e1c8] flex items-center gap-2 transition"
                >
                  <Settings size={16} /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-[#f5e1c8] flex items-center gap-2 text-red-600 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-[#fdf6eb] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
