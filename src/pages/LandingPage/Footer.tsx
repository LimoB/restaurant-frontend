import { forwardRef } from "react";

const Footer = forwardRef<HTMLDivElement>((_, ref) => (
  <footer
    ref={ref}
    className="bg-transparent text-gray-700 px-6 py-16 mt-20 backdrop-blur-sm"
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">
      {/* Credits */}
      <div>
        <h4 className="text-lg font-extrabold text-fuchsia-700 mb-4 drop-shadow-sm">Credits</h4>
        <ul className="space-y-2 text-gray-600 leading-relaxed">
          <li>
            Images by{" "}
            <a href="#" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all duration-200">
              Freepik
            </a>
          </li>
          <li>
            Icons from{" "}
            <a href="#" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all duration-200">
              Flaticon
            </a>
          </li>
          <li>
            Design by{" "}
            <a href="#" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all duration-200">
              Boaz Limo
            </a>
          </li>
          <li>
            Developed by{" "}
            <a href="#" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all duration-200">
              Limo Limo
            </a>
          </li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-lg font-extrabold text-fuchsia-700 mb-4 drop-shadow-sm">Services</h4>
        <ul className="space-y-2 text-gray-600 leading-relaxed">
          <li><a href="#" className="hover:text-orange-600 font-medium transition-all duration-200">Pricing</a></li>
          <li><a href="#" className="hover:text-orange-600 font-medium transition-all duration-200">Order Tracking</a></li>
          <li><a href="#" className="hover:text-orange-600 font-medium transition-all duration-200">Report an Issue</a></li>
          <li><a href="#" className="hover:text-orange-600 font-medium transition-all duration-200">Terms of Service</a></li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="text-lg font-extrabold text-fuchsia-700 mb-4 drop-shadow-sm">Company</h4>
        <ul className="space-y-2 text-gray-600 leading-relaxed">
          <li><a href="#" className="hover:text-orange-600 font-medium transition-all duration-200">About Us</a></li>
          <li><a href="#" className="hover:text-orange-600 font-medium transition-all duration-200">Contact</a></li>
          <li><a href="#" className="hover:text-orange-600 font-medium transition-all duration-200">Careers</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-lg font-extrabold text-fuchsia-700 mb-4 drop-shadow-sm">Contact Us</h4>
        <ul className="space-y-2 text-gray-600 leading-relaxed">
          <li>Nairobi, CBD</li>
          <li>Limo Restaurant</li>
          <li>
            <a href="mailto:restaurantlimo@gmail.com" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all duration-200">
              restaurantlimo@gmail.com
            </a>
          </li>
          <li>
            <a href="tel:+254712345678" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all duration-200">
              +254 712 345 678
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-12 pt-6 text-center text-xs text-gray-500 tracking-wide">
      <p className="mb-2">&copy; {new Date().getFullYear()} Limo Restaurant. All rights reserved.</p>
      <p className="sm:hidden text-[0.75rem]">
        Built with love by <span className="text-orange-500 font-medium">Boaz Limo</span>
      </p>
    </div>
  </footer>
));

export default Footer;
