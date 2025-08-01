"use client"
import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">
              Sumera Traders
            </h1>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-white hover:text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                Home
              </a>
              <a
                href="/products"
                className="text-white hover:text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                Products
              </a>
              <a
                href="/about"
                className="text-white hover:text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-white hover:text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button className="relative p-2 text-white hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 group">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-white/30 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                0
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-64 opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/30 backdrop-blur-sm rounded-b-lg mt-2 border border-white/10">
            <a
              href="/"
              className="text-white hover:text-white hover:bg-white/20 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/products"
              className="text-white hover:text-white hover:bg-white/20 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </a>
            <a
              href="/about"
              className="text-white hover:text-white hover:bg-white/20 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/contact"
              className="text-white hover:text-white hover:bg-white/20 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;