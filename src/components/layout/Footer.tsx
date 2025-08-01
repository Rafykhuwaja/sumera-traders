import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Company */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              CrystalSalt
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Discover the finest collection of premium crystals and artisanal salts. 
              We curate exceptional quality products that bring elegance and wellness 
              to your everyday life. Experience the magic of natural beauty.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 group">
                <div className="p-2 bg-white/10 rounded-lg border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm">hello@crystalsalt.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 group">
                <div className="p-2 bg-white/10 rounded-lg border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm">+92 321 1234567</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 group">
                <div className="p-2 bg-white/10 rounded-lg border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm">Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70 text-sm">
              © 2025 CrystalSalt. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-white/70 text-sm">
              <a href="/terms" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <span>•</span>
              <a href="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

