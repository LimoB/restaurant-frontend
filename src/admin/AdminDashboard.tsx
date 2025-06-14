import { Link } from "react-router-dom";
import { Users, Store, PackageSearch, Settings } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link
                    to="/admin/users"
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
                >
                    <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
                        <Users size={28} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700">Manage Users</h2>
                </Link>

                <Link
                    to="/admin/restaurants"
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
                >
                    <div className="bg-green-100 text-green-600 rounded-full p-3 mb-4">
                        <Store size={28} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700">
                        Manage Restaurants
                    </h2>
                </Link>

                <Link
                    to="/admin/orders"
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
                >
                    <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mb-4">
                        <PackageSearch size={28} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700">Manage Orders</h2>
                </Link>

                <Link
                    to="/admin/settings"
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
                >
                    <div className="bg-purple-100 text-purple-600 rounded-full p-3 mb-4">
                        <Settings size={28} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700">
                        Admin Settings
                    </h2>
                </Link>
            </div>
        </div>
    );
}
