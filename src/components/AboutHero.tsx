"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const slides: SlideData[] = [
    {
      id: 1,
      image: "/images/bannerimage1.jpg",
      title: "Our Crystal Heritage",
      subtitle: "Crafted by Earth, Delivered with Care",
      description:
        "At the heart of our journey lies a passion for authentic crystals. Each piece is ethically sourced and carefully selected to share the earth’s natural energy with you.",
    },
    {
      id: 2,
      image: "/images/bannerimage2.jpg",
      title: "Himalayan Salt Origins",
      subtitle: "Nature’s Purest Wellness Gift",
      description:
        "Our artisanal salts come straight from the ancient Himalayan mountains, hand-extracted and processed without chemicals to preserve their natural healing properties.",
    },
    {
      id: 3,
      image: "/images/bannerimage3.jpg",
      title: "Healing with Purpose",
      subtitle: "Energy That Inspires",
      description:
        "Every stone in our collection tells a story of renewal and balance. Our mission is to bring these powerful elements into your life with integrity and love.",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Component mount animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background Images Carousel */}
      <div className="absolute inset-0 blur-sm">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover scale-105 animate-ken-burns"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
            {/* Brand Color Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#e87b51]/20 via-transparent to-[#a7d8de]/20"></div>
          </div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#e87b51]/10 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#a7d8de]/5 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/5 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated Content */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Subtitle */}
            <div className="mb-6 animate-slide-in-from-left">
              <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm sm:text-base font-medium">
                {slides[currentSlide].subtitle}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-in-from-right">
              <span className="inline-block animate-fade-in-up">
                {slides[currentSlide].title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="inline-block mr-4 animate-word-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-from-bottom">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delayed">
              <button className="group px-8 py-4 bg-gradient-to-r from-[#e87b51] to-[#f4a76c] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out hover:from-[#f4a76c] hover:to-[#e87b51]">
                <span className="flex items-center gap-2">
                  Explore Collection
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 ease-out transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center z-20">
        <button
          onClick={prevSlide}
          className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 transform hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center z-20">
        <button
          onClick={nextSlide}
          className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 transform hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm font-medium rotate-90 origin-center whitespace-nowrap">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/60 to-transparent"></div>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-indicator"></div>
          </div>
        </div>
      </div>

      {/* Progress Bar
      <div className="absolute top-0 left-0 w-full h-1 bg-black/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-[#e87b51] to-[#a7d8de] transition-all duration-300 ease-out"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div> */}

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes ken-burns {
          0% {
            transform: scale(1.05) translateX(0) translateY(0);
          }
          25% {
            transform: scale(1.08) translateX(-1%) translateY(-0.5%);
          }
          50% {
            transform: scale(1.06) translateX(1%) translateY(1%);
          }
          75% {
            transform: scale(1.09) translateX(-0.5%) translateY(-1%);
          }
          100% {
            transform: scale(1.05) translateX(0) translateY(0);
          }
        }

        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1s;
        }

        @keyframes slide-in-from-left {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-from-left {
          animation: slide-in-from-left 0.8s ease-out forwards;
        }

        @keyframes slide-in-from-right {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-from-right {
          animation: slide-in-from-right 1s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        @keyframes slide-in-from-bottom {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in-from-bottom {
          animation: slide-in-from-bottom 0.8s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        @keyframes fade-in-up-delayed {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up-delayed {
          animation: fade-in-up-delayed 0.8s ease-out forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }

        @keyframes word-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px) rotateX(90deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        .animate-word-reveal {
          animation: word-reveal 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes scroll-indicator {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0.3;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;
