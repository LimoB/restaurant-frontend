import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface UserDropdownProps {
    name: string;
    avatarUrl?: string;
    onLogout: () => void;
}

export default function UserDropdown({ name, avatarUrl = "/avatar.jpeg", onLogout }: UserDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#93512c]/70 focus:outline-none transition-colors"
                aria-haspopup="true"
                aria-expanded={open}
            >
                <div className="relative">
                    <img
                        src={avatarUrl}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "/default-avatar.png";
                        }}
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <span className="text-sm font-medium text-white">{name}</span>
            </button>

            {open && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-[#fff3e0] border border-[#93512c] rounded-md shadow-lg z-20 overflow-hidden"
                    role="menu"
                >
                    <Link
                        to="/user/settings"
                        className="block px-4 py-2 text-sm text-[#5b2c0f] hover:bg-[#f5e1c8] transition-colors"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                    >
                        Profile Settings
                    </Link>
                    <button
                        onClick={() => {
                            setOpen(false);
                            onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[#f5e1c8] transition-colors"
                        role="menuitem"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
