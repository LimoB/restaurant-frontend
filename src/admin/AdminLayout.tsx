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
    <div className="flex min-h-screen bg-base-100">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">🍽️ Admin Panel</h2>
        <nav className="space-y-3">
          <Link to="/admin" className="block hover:text-accent">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-accent">Users</Link>
          <Link to="/admin/restaurants" className="block hover:text-accent">Restaurants</Link>
          <Link to="/admin/orders" className="block hover:text-accent">Orders</Link>
          {/* Settings removed from sidebar */}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-primary text-white px-6 py-4 shadow-md">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 hover:text-yellow-200"
            >
              <User size={20} />
              <span>Admin</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg z-50">
                <Link
                  to="/admin/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Settings size={16} /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
