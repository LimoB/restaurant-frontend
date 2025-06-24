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
import hero6 from "../../assets/serve.jpeg"; // Replace with your actual paths

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

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
      <div className="max-w-lg z-10">
        <h1 className="text-4xl font-bold mb-4">Fresh. Tasty. Delivered.</h1>
        <p className="text-gray-600 mb-6">
          Experience delicious meals made with the freshest ingredients, delivered straight to your door.
        </p>
        <div className="flex gap-4">
          <img src={pasta} alt="Creamy Italian Pasta" className="w-24 h-24 rounded-full object-cover" />
          <img src={chickenNuggets} alt="Crunchy Chicken Nuggets" className="w-24 h-24 rounded-full object-cover" />
          <img src={vegetableEggs} alt="Healthy Vegetable Eggs" className="w-24 h-24 rounded-full object-cover" />
        </div>
      </div>

      {/* Slideshow wrapper with fading images */}
      <div className="relative w-[400px] h-[400px] mt-8 md:mt-0">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`
                            absolute top-0 left-0 w-full h-full rounded-full object-cover border-4 border-white shadow-2xl
                            transition-opacity duration-1000 ease-in-out
                            ${index === currentImage ? "opacity-100 z-20" : "opacity-0 z-10"}
                        `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;