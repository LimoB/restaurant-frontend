import { Link } from "react-router-dom";

const ReservationSection = () => (
  <section className="relative px-6 py-24 text-center overflow-hidden">
    <div className="relative z-10 max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-fuchsia-700 mb-4 drop-shadow-sm">
        Reserve Your Table
      </h2>
      <p className="text-xl text-gray-700 font-medium mb-4">Call us today to book a spot</p>
      <div className="w-20 h-1 bg-fuchsia-400 mx-auto mb-6 rounded-full"></div>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Planning a special night out? Contact us to reserve a table and enjoy a delightful dining experience with top-notch service and a cozy ambiance.
      </p>
      <Link
        to="/reserve"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-3 px-10 rounded-full shadow-md transition-all duration-200 text-lg font-semibold"
      >
        Book Now
      </Link>
    </div>
  </section>
);

export default ReservationSection;
