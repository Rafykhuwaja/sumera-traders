"use client";
import React, { useEffect, useRef, useState } from "react";
import { Shield, Truck, Users, Award } from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyChooseUs: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features: FeatureCard[] = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Authentic Quality",
      description:
        "Every crystal and salt we offer is genuine and sourced directly from trusted suppliers. We guarantee authenticity with certificates and detailed origin information for complete peace of mind.",
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Fast Delivery",
      description:
        "Experience lightning-fast shipping with secure packaging designed specifically for delicate crystals and salts. We ensure your precious items arrive safely and promptly at your doorstep.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Expert Guidance",
      description:
        "Our knowledgeable team of crystal and mineral experts is here to help you choose the perfect products. Get personalized recommendations based on your specific needs and preferences.",
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Premium Service",
      description:
        "We pride ourselves on exceptional customer service and premium quality products. From consultation to after-sales support, we're committed to exceeding your expectations every step of the way.",
    },
  ];

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full  py-16 px-4 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#e87b51] to-[#a7d8de] mx-auto rounded-full"></div>
          <p className="text-xl text-white/80 mt-6 max-w-2xl mx-auto">
            Discover what makes Sumera Traders the preferred choice for premium
            crystals and artisanal salts
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`group relative transition-all duration-700 ease-out ${
                visibleCards[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Main Card */}
              <div className="relative h-full bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-white/15 overflow-hidden">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 text-center h-full flex flex-col">
                  {/* Icon Container */}
                  <div className="mb-6 mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#e87b51]/30 to-[#a7d8de]/30 rounded-2xl flex items-center justify-center border border-white/30 group-hover:border-white/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <div className="text-white group-hover:text-white/95 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-white/95 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/85 leading-relaxed text-sm lg:text-base flex-grow group-hover:text-white/95 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#e87b51] to-[#a7d8de] mx-auto rounded-full group-hover:w-16 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Floating Particles Effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <div
                  className="absolute bottom-6 left-4 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>

                {/* Decorative Corner Elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-[#e87b51]/10 to-[#a7d8de]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-[#a7d8de]/8 to-[#e87b51]/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Card Shadow/Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e87b51]/20 to-[#a7d8de]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg scale-110 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#e87b51]"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-[#e87b51] to-[#a7d8de] rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#a7d8de]"></div>
          </div>
          <p className="text-white/70 text-lg">
            Experience the Sumera Traders difference today
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
