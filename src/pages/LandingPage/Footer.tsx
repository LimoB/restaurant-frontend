const Footer = () => (
    <footer className="bg-gradient-to-br from-white via-fuchsia-50 to-pink-100 text-gray-700 px-6 py-16 mt-20 border-t border-pink-200 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">
            {/* Credits */}
            <div>
                <h4 className="text-lg font-bold text-fuchsia-800 mb-4">Credits</h4>
                <ul className="space-y-2 text-gray-600">
                    <li>
                        Images by <a href="#" className="text-fuchsia-600 hover:underline">Freepik</a>
                    </li>
                    <li>
                        Icons from <a href="#" className="text-fuchsia-600 hover:underline">Flaticon</a>
                    </li>
                    <li>
                        Design by <a href="#" className="text-fuchsia-600 hover:underline">Boaz Limo</a>
                    </li>
                    <li>
                        Developed by <a href="#" className="text-fuchsia-600 hover:underline">Limo Limo</a>
                    </li>
                </ul>
            </div>

            {/* Services */}
            <div>
                <h4 className="text-lg font-bold text-fuchsia-800 mb-4">Services</h4>
                <ul className="space-y-2 text-gray-600">
                    <li><a href="#" className="hover:text-fuchsia-600">Pricing</a></li>
                    <li><a href="#" className="hover:text-fuchsia-600">Order Tracking</a></li>
                    <li><a href="#" className="hover:text-fuchsia-600">Report an Issue</a></li>
                    <li><a href="#" className="hover:text-fuchsia-600">Terms of Service</a></li>
                </ul>
            </div>

            {/* Company */}
            <div>
                <h4 className="text-lg font-bold text-fuchsia-800 mb-4">Company</h4>
                <ul className="space-y-2 text-gray-600">
                    <li><a href="#" className="hover:text-fuchsia-600">About Us</a></li>
                    <li><a href="#" className="hover:text-fuchsia-600">Contact</a></li>
                    <li><a href="#" className="hover:text-fuchsia-600">Careers</a></li>
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h4 className="text-lg font-bold text-fuchsia-800 mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-600">
                    <li>Nairobi, CBD</li>
                    <li>Limo Restaurant</li>
                    <li>
                        <a href="mailto:restaurantlimo@gmail.com" className="text-fuchsia-600 hover:underline">
                            restaurantlimo@gmail.com
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-500 tracking-wide">
            © {new Date().getFullYear()} Limo Restaurant. All rights reserved.
        </div>
    </footer>
);

export default Footer;
