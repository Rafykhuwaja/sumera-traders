"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Target, Eye } from 'lucide-react';

interface CardData {
  title: string;
  icon: React.ReactNode;
  content: string;
}

const MissionVision: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const cardData: CardData[] = [
    {
      title: "Our Mission",
      icon: <Target className="w-12 h-12" />,
      content: "To provide our customers with the finest quality crystals and artisanal salts sourced from around the world. We are committed to authenticity, sustainability, and exceptional service while fostering wellness and natural beauty in every product we offer."
    },
    {
      title: "Our Vision", 
      icon: <Eye className="w-12 h-12" />,
      content: "To become the world's most trusted destination for premium crystals and natural salts, inspiring people to connect with nature's healing properties. We envision a future where authentic, sustainable minerals enhance lives globally through their natural beauty and wellness benefits."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full backdrop-blur-lg py-16 px-4 sm:py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our Mission & Vision
          </h2>
          <div 
            className={`w-24 h-1 bg-gradient-to-r from-[#e87b51]/70 to-[#a7d8de]/30 mx-auto rounded-full transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          ></div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              {/* Glass Effect Card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-white/15 overflow-hidden">
                
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 text-white group-hover:text-white/90 transition-colors duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#e87b51]/70 to-[#a7d8de]/30 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110">
                      {card.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-white/95 transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Content */}
                  <p className="text-white/90 leading-relaxed text-lg group-hover:text-white/95 transition-colors duration-300">
                    {card.content}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#a7d8de]/20 to-[#9966cc]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-[#9966cc]/15 to-[#a7d8de]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Floating Animation Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#a7d8de]/5 to-[#9966cc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm scale-105"></div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div 
          className={`text-center mt-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#a7d8de]/30"></div>
            <div className="w-3 h-3 bg-gradient-to-br  from-[#e87b51]/50  rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#a7d8de]/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;