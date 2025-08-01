"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface SlideImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

const ImageSwitcher: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: SlideImage[] = [
    {
      id: 1,
      src: "/images/animateImage2.jpg",
      alt: "Naturally Formed Salt Crystals",
      title: "Naturally Formed Salt Crystals",
      subtitle:
        "Pure Himalayan mineral formations crafted by nature over millions of years",
    },
    {
      id: 2,
      src: "/images/animateImage2.jpg",
      alt: "Artisanal Salt Lamps",
      title: "Artisanal Salt Lamps",
      subtitle:
        "Handcrafted illumination that brings warmth and wellness to your space",
    },
    {
      id: 3,
      src: "/images/animateImage3.jpg",
      alt: "Premium Salt Collection",
      title: "Premium Salt Collection",
      subtitle:
        "Curated selection of the finest Himalayan salt products for your home",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500); // Change image every 4.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />

            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 sm:px-12 max-w-4xl">
          {/* Decorative Element */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Sparkles className="h-6 w-6 text-white/70" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              <Sparkles className="h-6 w-6 text-white/70" />
            </div>
          </div>

          {/* Dynamic Text Content */}
          <div className="space-y-4">
            <h2
              key={`title-${currentIndex}`}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight animate-fade-in"
            >
              {images[currentIndex].title}
            </h2>

            <p
              key={`subtitle-${currentIndex}`}
              className="text-white/90 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {images[currentIndex].subtitle}
            </p>
          </div>

          {/* Floating Crystal Elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-96 h-96">
              <div className="absolute top-0 left-0 w-2 h-2 bg-white/20 rounded-full animate-float"></div>
              <div className="absolute top-1/4 right-0 w-1 h-1 bg-white/30 rounded-full animate-float delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-white/15 rounded-full animate-float delay-500"></div>
              <div className="absolute bottom-0 right-1/3 w-1 h-1 bg-white/25 rounded-full animate-float delay-1500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ImageSwitcher;
