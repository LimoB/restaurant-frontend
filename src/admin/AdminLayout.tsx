import {
  Outlet,
  NavLink,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import {
  Utensils,
  ClipboardList,
  Users,
  Truck,
  MessageSquare,
  Layers,
  MapPin,
  Globe,
  Cog,
  Home,
} from "lucide-react";

import AdminNavbar from "../components/admin/AdminNavbar"; // ✅ Top navbar
import { useTheme } from "../context/ThemeContext"; // ✅ Corrected import path

const links = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: <Home size={18} />,
  },
  {
    label: "Orders",
    to: "/admin/orders",
    icon: <ClipboardList size={18} />,
  },
  {
    label: "Restaurants",
    icon: <Utensils size={18} />,
    sublinks: [
      { label: "Manage Restaurants", to: "/admin/restaurants" },
      { label: "Manage Owners", to: "/admin/restaurant-owners" },
    ],
  },
  {
    label: "Menu Items",
    to: "/admin/menu",
    icon: <Layers size={18} />,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: <Users size={18} />,
  },
  {
    label: "Drivers",
    to: "/admin/drivers",
    icon: <Truck size={18} />,
  },
  {
    label: "Comments",
    to: "/admin/comments",
    icon: <MessageSquare size={18} />,
  },
  {
    label: "Categories",
    to: "/admin/categories",
    icon: <Layers size={18} />,
  },
  {
    label: "States",
    to: "/admin/states",
    icon: <MapPin size={18} />,
  },
  {
    label: "Cities",
    to: "/admin/cities",
    icon: <Globe size={18} />,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: <Cog size={18} />,
  },
];

const AdminLayout = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { toggleTheme, isDarkMode } = useTheme(); // ✅ Hook destructure

  return (
    <div className="flex min-h-screen bg-[#f9f7f4] dark:bg-[#0f172a] font-sans relative">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg text-[#1e1e1e] dark:text-white p-6 hidden md:flex flex-col gap-6 border-r border-gray-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-wide mb-2">Admin Panel</h2>
        <nav className="flex flex-col gap-1">
          {links.map(({ label, to, icon, sublinks }) => {
            const isParentActive = sublinks?.some((s) =>
              location.pathname.startsWith(s.to)
            );
            const isOpen = openMenus[label] || isParentActive;

            if (!sublinks) {
              return (
                <NavLink
                  key={label}
                  to={to!}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-[#e8f0fe] text-blue-700 dark:bg-slate-800 dark:text-white"
                        : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-300"
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
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition text-left w-full ${
                    isParentActive
                      ? "bg-[#e8f0fe] text-blue-700 dark:bg-slate-800 dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-300"
                  }`}
                >
                  {icon} {label}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  } ml-6 flex flex-col gap-1`}
                >
                  {sublinks.map((sublink) => (
                    <NavLink
                      key={sublink.label}
                      to={sublink.to}
                      className={({ isActive }) =>
                        `px-3 py-1 text-sm rounded-md transition ${
                          isActive
                            ? "bg-[#e8f0fe] text-blue-700 dark:bg-slate-700 dark:text-white"
                            : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300"
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
        {/* ✅ Navbar with theme props */}
        <AdminNavbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

        <main className="flex-1 p-6 overflow-auto bg-[#fafafa] dark:bg-slate-950 text-[#1e1e1e] dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
