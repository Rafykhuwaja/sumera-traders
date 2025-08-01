import React from 'react';
import { Gem, Sparkles } from 'lucide-react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Crystal Icon Divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-6 w-6 text-white/60" />
              <Gem className="h-8 w-8 text-white" />
              <Sparkles className="h-6 w-6 text-white/60" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Sumera Traders
            </span>
          </h1>

          {/* Description Paragraph */}
          <div className="text-center space-y-4">
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
              Discover the pure essence of nature with our premium collection of handcrafted 
              Himalayan pink salt products. Each crystal is carefully sourced from the pristine 
              mountains of Pakistan, bringing you centuries of natural minerals and healing properties.
            </p>
            
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              From artisanal salt lamps that illuminate your space with warm, amber light to 
              gourmet cooking salts that elevate your culinary creations - we export worldwide 
              to bring you the finest crystal aesthetics and wellness benefits nature has to offer.
            </p>

            <p className="text-white/70 text-base leading-relaxed max-w-xl mx-auto">
              Experience the magic of authentic crystals and premium salts, 
              curated with passion and delivered with care to your doorstep.
            </p>
          </div>

          {/* Decorative Crystal Elements */}
          <div className="flex items-center justify-center mt-12 space-x-8">
            <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse delay-100"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse delay-300"></div>
            <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;