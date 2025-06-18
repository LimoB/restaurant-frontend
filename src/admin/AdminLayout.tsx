import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-900 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <nav className="space-y-2">
                    <Link to="/admin" className="block hover:text-yellow-400">Dashboard</Link>
                    <Link to="/admin/users" className="block hover:text-yellow-400">Users</Link>
                    <Link to="/admin/restaurants" className="block hover:text-yellow-400">Restaurants</Link>
                    <Link to="/admin/orders" className="block hover:text-yellow-400">Orders</Link>
                    <Link to="/admin/settings" className="block hover:text-yellow-400">Settings</Link>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
