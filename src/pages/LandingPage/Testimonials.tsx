const testimonials = [
  { quote: "Always fresh, always delicious. The app makes ordering a breeze!", name: "Sarah M." },
  { quote: "Reliable service and on-time delivery. Highly recommended!", name: "James W." },
  { quote: "My kids can’t get enough of the nuggets! Great deals and easy to use.", name: "Linda C." },
];

const Testimonials = () => (
  <section className="py-24 px-6 text-center relative overflow-hidden">
    {/* No background overlay to keep it clean */}
    <div className="relative z-10 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-fuchsia-700 mb-12 drop-shadow-sm">
        Customer Reviews
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {testimonials.map((review, index) => (
          <div
            key={index}
            className="max-w-sm mx-auto p-6 rounded-2xl transition hover:scale-[1.02]"
          >
            <p className="italic text-gray-700 text-lg leading-relaxed">
              "{review.quote}"
            </p>
            <span className="block mt-4 font-bold text-fuchsia-700">- {review.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
