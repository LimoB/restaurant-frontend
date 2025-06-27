import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  LogOut,
  User,
  Settings,
  Utensils,
  ClipboardList,
  Users,
  Truck,
  MessageSquare,
  Layers,
  MapPin,
  Globe,
  Cog,
} from "lucide-react";

const links = [
  { label: "Orders", to: "/admin/orders", icon: <ClipboardList size={18} /> },
  {
    label: "Restaurants",
    icon: <Utensils size={18} />,
    sublinks: [
      { label: "Manage Restaurants", to: "/admin/restaurants" },
      { label: "Manage Owners", to: "/admin/restaurant-owners" },
    ],
  },
  { label: "Menu Items", to: "/admin/menu", icon: <Layers size={18} /> },
  { label: "Users", to: "/admin/users", icon: <Users size={18} /> },
  { label: "Drivers", to: "/admin/drivers", icon: <Truck size={18} /> },
  { label: "Comments", to: "/admin/comments", icon: <MessageSquare size={18} /> },
  { label: "Categories", to: "/admin/categories", icon: <Layers size={18} /> },
  { label: "States", to: "/admin/states", icon: <MapPin size={18} /> },
  { label: "Cities", to: "/admin/cities", icon: <Globe size={18} /> },
  { label: "Settings", to: "/admin/settings", icon: <Cog size={18} /> },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f9f7f4] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-lg text-[#1e1e1e] p-6 hidden md:flex flex-col gap-6 border-r border-gray-200 shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-wide mb-2">Admin Panel</h2>
        <nav className="flex flex-col gap-1">
          {links.map(({ label, to, icon, sublinks }) => {
            const isParentActive = sublinks?.some((s) => location.pathname.startsWith(s.to));
            const isOpen = openMenus[label] || isParentActive;

            if (!sublinks) {
              return (
                <NavLink
                  key={label}
                  to={to!}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${isActive ? "bg-[#e8f0fe] text-blue-700" : "hover:bg-gray-100 text-gray-800"
                    }`
                  }
                >
                  {icon} {label}
                </NavLink>
              );
            }

            return (
              <div key={label} className="flex flex-col">
                <button
                  onClick={() =>
                    setOpenMenus((prev) => ({
                      ...prev,
                      [label]: !prev[label],
                    }))
                  }
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition text-left w-full ${isParentActive ? "bg-[#e8f0fe] text-blue-700" : "hover:bg-gray-100 text-gray-800"
                    }`}
                >
                  {icon} {label}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    } ml-6 flex flex-col gap-1`}
                >
                  {sublinks.map((sublink) => (
                    <NavLink
                      key={sublink.label}
                      to={sublink.to}
                      className={({ isActive }) =>
                        `px-3 py-1 text-sm rounded-md transition ${isActive
                          ? "bg-[#e8f0fe] text-blue-700"
                          : "hover:bg-gray-100 text-gray-700"
                        }`
                      }
                    >
                      {sublink.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
          <h1 className="text-xl font-semibold tracking-wide text-[#333]">Admin Dashboard</h1>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600 transition"
            >
              <User size={20} />
              <span>Admin</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-md z-50 overflow-hidden">
                <NavLink
                  to="/admin/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Settings size={16} /> Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto bg-[#fafafa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
