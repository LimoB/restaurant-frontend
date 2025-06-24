// src/components/MenuLayout.tsx
import { Outlet } from "react-router-dom";

export default function MenuLayout() {
    return (
        <div className="min-h-screen bg-white">
            <header className="text-center py-6 text-2xl font-bold">Browse Our Menu</header>
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}