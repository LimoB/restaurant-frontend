function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} GourmetExpress. All rights reserved.</p>
        <p className="text-gray-400 mt-1">Crafted with 🍔 + ☕ + 💻</p>
      </div>
    </footer>
  );
}

export default Footer;
