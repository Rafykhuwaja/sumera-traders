"use client";
import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-white/10 py-2 md:py-3">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="block">
              <div className="h-16 w-36 sm:h-20 sm:w-48 md:h-24 md:w-60 transition-all duration-300 flex items-center cursor-pointer hover:opacity-80">
                <Image
                  src="/images/Logo.png"
                  alt="Sumera Traders"
                  width={1000}
                  height={1000}
                  className="object-contain h-full w-full"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center">
            <div className="ml-6 flex items-center space-x-6 lg:space-x-8">
              <Link 
                href="/"
                className="text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 block no-underline"
                style={{ textDecoration: 'none' }}
                onClick={(e) => {
                  console.log('Home link clicked');
                  console.log('Current pathname:', window.location.pathname);
                }}
              >
                Home
              </Link>
              <Link 
                href="/products"
                className="text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 block no-underline"
                style={{ textDecoration: 'none' }}
              >
                Products
              </Link>
              <Link 
                href="/about"
                className="text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 block no-underline"
                style={{ textDecoration: 'none' }}
              >
                About
              </Link>
              <Link 
                href="/contact"
                className="text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 block no-underline"
                style={{ textDecoration: 'none' }}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button className="relative p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 group">
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
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
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
          className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div
            className={`absolute top-0 left-0 w-full bg-black/90 border-b border-white/10 rounded-b-lg shadow-lg transition-all duration-300 ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
          >
            <div className="flex flex-col px-4 pt-6 pb-8 space-y-2">
              <Link
                href="/"
                className="text-white hover:bg-white/20 block px-3 py-3 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 no-underline"
                style={{ textDecoration: 'none' }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white hover:bg-white/20 block px-3 py-3 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 no-underline"
                style={{ textDecoration: 'none' }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-white hover:bg-white/20 block px-3 py-3 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 no-underline"
                style={{ textDecoration: 'none' }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:bg-white/20 block px-3 py-3 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 no-underline"
                style={{ textDecoration: 'none' }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;