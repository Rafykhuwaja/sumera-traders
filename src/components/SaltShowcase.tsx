import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

// Function to convert category name to slug
function createSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .trim();
}

// Interface for category with image
interface CategoryWithImage {
  name: string;
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
}

// Function to fetch unique categories with their first product's image
async function fetchCategories(): Promise<CategoryWithImage[]> {
  // First, get all unique categories
  const allProducts = await client.fetch(`
    *[_type == "product" && defined(category)]{
      category
    }
  `);

  const uniqueCategoryNames = Array.from(
    new Set(allProducts.map((product: any) => product.category))
  ).sort(); // Sort to ensure consistent order

  // For each category, get the first product's image
  const categoriesWithImages = await Promise.all(
    uniqueCategoryNames.map(async (categoryName) => {
      const firstProduct = await client.fetch(
        `
        *[_type == "product" && category == $categoryName][0]{
          mainImage{
            asset->{
              _id,
              url
            },
            alt
          }
        }
      `,
        { categoryName }
      );

      return {
        name: String(categoryName),
        image: firstProduct?.mainImage || null,
      } as CategoryWithImage;
    })
  );

  return categoriesWithImages
    .filter((cat) => typeof cat.name === "string" && cat.name) // Remove any null category names
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort final result for consistency
}

async function CategorySection() {
  const categories = await fetchCategories();

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

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => {
              const slug = createSlug(category.name);
              const imageUrl = category.image?.asset?.url
                ? urlFor(category.image).url()
                : "/api/placeholder/300/300";

              return (
                <div
                  key={category.name}
                  className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20"
                >
                  {/* Category Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={category.image?.alt || `${category.name} category`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-3 capitalize">
                      {category.name}
                    </h3>

                    {/* View Products Button */}
                    <Link
                      href={`/category/${slug}`}
                      className="inline-flex items-center justify-center w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-200 hover:shadow-lg group-hover:bg-white/40"
                    >
                      <span>View Products</span>
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Decorative Corner Element */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white/80" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // No Categories Found
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white/60" />
            </div>
            <p className="text-white/80 text-lg">
              No product categories found.
            </p>
          </div>
        )}

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
}

export default CategorySection;
