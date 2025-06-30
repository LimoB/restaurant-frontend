import { useEffect, useState } from "react";
import pasta from "../../assets/pasta.png";
import chickenNuggets from "../../assets/chicken-nuggets.png";
import vegetableEggs from "../../assets/vegetable-eggs.png";

// Hero images
import hero1 from "../../assets/resta2.jpg";
import hero2 from "../../assets/Restaurant.jpg";
import hero3 from "../../assets/resta3.jpeg";
import hero4 from "../../assets/people.jpeg";
import hero5 from "../../assets/food 3.jpeg";
import hero6 from "../../../public/Tomatoes and cheese fall on pizza.jpeg";
import hero7 from "../../../public/Burger.jpeg";
import hero8 from "../../../public/Pepperoni Pizza.jpeg";
import hero9 from "../../../public/Salmon Sushi.jpeg";

// ✅ Include all images
const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero9];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 relative">
      {/* Text Content */}
      <div className="max-w-lg z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 drop-shadow">
          Fresh. Tasty. Delivered.
        </h1>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Experience delicious meals made with the freshest ingredients, delivered straight to your door.
        </p>
        <div className="flex gap-4">
          <img src={pasta} alt="Creamy Italian Pasta" className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover" />
          <img src={chickenNuggets} alt="Crunchy Chicken Nuggets" className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover" />
          <img src={vegetableEggs} alt="Healthy Vegetable Eggs" className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover" />
        </div>
      </div>

      {/* Image Slideshow – Circular */}
      <div className="relative w-[600px] h-[600px] mt-12 md:mt-0 rounded-full overflow-hidden shadow-2xl">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`
              absolute top-0 left-0 w-full h-full object-cover
              rounded-full transition-all duration-1000 ease-in-out
              ${index === currentImage ? "opacity-100 scale-100 z-20" : "opacity-0 scale-105 z-10"}
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
