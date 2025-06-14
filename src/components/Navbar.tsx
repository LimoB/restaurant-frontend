import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-orange-600">
          🍽️ GourmetExpress
        </Link>
        <nav className="space-x-4 hidden md:block">
          <Link to="/menu" className="text-gray-700 hover:text-orange-600 transition">
            Menu
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-orange-600 transition">
            Login
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-orange-600 transition">
            Register
          </Link>
        </nav>
        <div className="md:hidden">
          {/* You can add mobile menu logic here later */}
          <span className="text-2xl text-gray-700">☰</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
