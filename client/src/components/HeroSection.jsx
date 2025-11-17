import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Add as many images as you want from /public/images/
const sliderImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">

      {/* SLIDES */}
      {sliderImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg animate-fadeIn">
          Empowering Communities, Transforming Lives
        </h1>

        <p className="mt-4 text-sm md:text-lg max-w-2xl opacity-90 animate-fadeIn delay-200">
          Manav Seva India works to uplift vulnerable communities through
          healthcare, education, social protection, and humanitarian initiatives.
        </p>

        <div className="mt-6 flex gap-4 animate-fadeIn delay-300">
          <Link
            to="/about"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
          >
            Learn More
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 border-2 border-white hover:bg-white hover:text-black rounded-lg transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 p-3 rounded-full z-20"
      >
        ❮
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 p-3 rounded-full z-20"
      >
        ❯
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 flex justify-center w-full gap-2 z-20">
        {sliderImages.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

