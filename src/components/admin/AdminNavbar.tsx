import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    Bell,
    Moon,
    Sun,
    User,
    Settings,
} from "lucide-react";

import LogoutButton from "@/components/LogoutButton"; // ✅ Make sure the path is correct
// import React = require("react");

interface Props {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const AdminNavbar = ({ toggleTheme, isDarkMode }: Props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#0e0f10] border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold tracking-wide text-[#333] dark:text-white">
                    Admin Dashboard
                </h1>
                <nav className="text-sm text-gray-500 dark:text-gray-400">
                    Dashboard &gt; Current Page
                </nav>
            </div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications */}
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 relative">
                    <Bell size={18} className="text-gray-600 dark:text-gray-300" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                        3
                    </span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600 transition dark:text-white"
                    >
                        <User size={20} />
                        <span>Admin</span>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-600 rounded-xl shadow-md z-50 overflow-hidden">
                            <NavLink
                                to="/admin/profile"
                                onClick={() => setDropdownOpen(false)}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                My Profile
                            </NavLink>
                            <NavLink
                                to="/admin/settings"
                                onClick={() => setDropdownOpen(false)}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Settings size={16} className="inline mr-1" /> Settings
                            </NavLink>
                            <div onClick={() => setDropdownOpen(false)}>
                                <LogoutButton />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
