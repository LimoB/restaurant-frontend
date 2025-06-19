import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/icon.svg"; // Or "logo.png" depending on your preference

function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <motion.img
        src={logo}
        alt="Logo"
        className="w-20 h-20 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to <span className="text-blue-500">GourmetExpress</span> 🍽️
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Craving something delicious? Discover and order from your favorite local restaurants.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full shadow transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-full shadow transition"
        >
          Register
        </Link>
      </motion.div>
    </div>
  );
}

export default LandingPage;
