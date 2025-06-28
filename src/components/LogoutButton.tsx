import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import { logout } from "../features/auth/authSlice"; // ✅ Adjust the import path as needed

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // ✅ Clear Redux auth state (token + user)
        dispatch(logout());

        // ✅ Redirect to login page
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 mt-auto rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 transition"
        >
            <LogOut size={18} /> Logout
        </button>
    );
};

export default LogoutButton;
