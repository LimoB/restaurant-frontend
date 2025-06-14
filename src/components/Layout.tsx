import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">MyRestaurant</Link>
          <nav className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        {children}
      </main>

      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyRestaurant. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
