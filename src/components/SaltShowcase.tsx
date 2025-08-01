import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import Link from "next/link";

interface SaltProduct {
  id: number;
  name: string;
  image: string;
  alt: string;
  slug: string; // Optional slug for future use
}

const SaltShowcase: React.FC = () => {
  const saltProducts: SaltProduct[] = [
    {
      id: 1,
      name: "Flower Bowl",
      image: "/images/image.webp",
      alt: "Himalayan Salt Flower Bowl",
      slug: "testing",
    },
    {
      id: 2,
      name: "Pyramid Lamp",
      image: "/images/image.webp",
      alt: "Himalayan Salt Pyramid Lamp",
      slug: "testing",
    },
    {
      id: 3,
      name: "Crystal Sphere",
      image: "/images/image.webp",
      alt: "Himalayan Salt Crystal Sphere",
      slug: "testing",
    },
    {
      id: 4,
      name: "Tea Light Holder",
      image: "/images/image.webp",
      alt: "Himalayan Salt Tea Light Holder",
      slug: "testing",
    },
    {
      id: 5,
      name: "Natural Rock Lamp",
      image: "/images/image.webp",
      alt: "Natural Himalayan Salt Rock Lamp",
      slug: "testing",
    },
    {
      id: 6,
      name: "Salt Cooking Block",
      image: "/images/image.webp",
      alt: "Himalayan Salt Cooking Block",
      slug: "testing",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-6 w-6 text-white/60" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <Sparkles className="h-6 w-6 text-white/60" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Premium Salt Collection
          </h2>

          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Handcrafted Himalayan salt products that bring natural beauty and
            wellness to your space
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          {saltProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-white/10 transition-all duration-500 hover:scale-105 hover:bg-black/30"
            >
              {/* Image Container */}
              <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </div>

              {/* Product Name */}
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-white/90 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Decorative underline */}
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto group-hover:via-white/60 transition-all duration-300"></div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-white/30 rounded-full animate-ping delay-100"></div>
                  <div className="w-1 h-1 bg-white/20 rounded-full animate-ping delay-200"></div>
                </div>
              </div>
              <Link href={`/products/${product.slug}`}>
                <button className="bg-white/20 py-2 px-4 rounded-full">
                  View More
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex items-center justify-center mt-16 space-x-4">
          <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse delay-200"></div>
          <div className="w-4 h-4 bg-white/40 rounded-full animate-pulse delay-400"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse delay-600"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse delay-800"></div>
        </div>
      </div>
    </section>
  );
};

export default SaltShowcase;
