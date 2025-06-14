import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function LandingPage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: 'url("/hero.jpg")' }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Logo"
          className="w-24 h-24 mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to <span className="text-blue-400">GourmetExpress</span> 🍽️
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-2xl text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Craving something delicious? Discover and order from your favorite local restaurants.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-6 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full shadow-md transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-full shadow-md transition"
          >
            Register
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
