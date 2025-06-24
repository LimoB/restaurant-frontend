import pasta from "../../assets/pasta.png";

const OffersSection = () => (
  <section className="text-center px-6 py-16 relative">
    <h2 className="text-4xl font-bold text-fuchsia-700 mb-4">Limited-Time Offers!</h2>
    <p className="text-gray-800 max-w-xl mx-auto mb-6">
      Enjoy amazing discounts on your favorite dishes. Don’t miss out on our exclusive seasonal deals.
    </p>
    <img
      src={pasta}
      alt="Offer Pasta Dish"
      className="w-40 mx-auto drop-shadow-md mb-4"
      loading="lazy"
    />
    <div className="bg-fuchsia-600/90 text-white px-4 py-2 rounded-full w-max mx-auto font-semibold shadow-md">
      25% Off Today
    </div>
  </section>
);

export default OffersSection;
