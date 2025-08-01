"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Gem, Mountain, Award } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const OurStory: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timelineData: TimelineItem[] = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started as a small family business with a passion for authentic crystals and natural salts. Our journey began with sourcing the finest minerals from trusted suppliers around the world.",
      icon: <Gem className="w-6 h-6" />
    },
    {
      year: "2022", 
      title: "Expanding Horizons",
      description: "Grew our collection to include rare gemstones and premium Himalayan salts. We established partnerships with artisanal miners and began our commitment to sustainable sourcing practices.",
      icon: <Mountain className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "Excellence Recognized", 
      description: "Today, Sumera Traders is recognized as a premier destination for authentic crystals and artisanal salts. We continue to serve customers worldwide with quality, authenticity, and exceptional service.",
      icon: <Award className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        { 
          threshold: 0.3,
          rootMargin: '0px 0px -100px 0px'
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  return (
    <section className="w-full  py-16 px-4 sm:py-20 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#e87b51] to-[#a7d8de] mx-auto rounded-full"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e87b51] via-white/30 to-[#a7d8de]"></div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-20">
            {timelineData.map((item, index) => (
              <div
                key={index}
                ref={el => { itemRefs.current[index] = el; }}
                className={`relative transition-all duration-700 ease-out ${
                  visibleItems[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#e87b51] to-[#a7d8de] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 ${
                  index % 2 === 0 
                    ? 'md:pr-1/2 md:text-right md:pr-16' 
                    : 'md:pl-1/2 md:pl-16'
                }`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    {/* Year Badge */}
                    <div className="inline-block bg-gradient-to-r from-[#e87b51] to-[#a7d8de] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                      {item.year}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/90 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#e87b51]"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-[#e87b51] to-[#a7d8de] rounded-full"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#a7d8de]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;