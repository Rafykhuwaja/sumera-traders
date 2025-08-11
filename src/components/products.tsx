"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

// Types
interface Product {
  _id: string;
  name: string;
  price: number | null;
  originalPrice?: number | null;
  category: string;
  description?: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  featured?: boolean;
}

// Function to fetch unique categories from Sanity
async function fetchCategories(): Promise<string[]> {
  try {
    const products = await client.fetch(`
      *[_type == "product" && defined(category)]{
        category
      }
    `);

    // Extract unique categories and filter out null/undefined values
    const uniqueCategories = [
      ...Array.from(new Set(products.map((product: any) => product.category))),
    ];
    const filteredCategories = uniqueCategories.filter(Boolean) as string[];

    // Add "All" at the beginning
    return ["All", ...filteredCategories];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return ["All"]; // Fallback to just "All" if error occurs
  }
}

// Function to fetch products from Sanity
async function fetchProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch(`
      *[_type == "product"] | order(featured desc, _createdAt desc) {
        _id,
        name,
        price,
        originalPrice,
        category,
        description,
        mainImage {
          asset -> {
            url
          }
        },
        featured
      }
    `);

    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ProductsSection = () => {
  // State management
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price" | "newest">("newest");

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [fetchedCategories, fetchedProducts] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(fetchedCategories);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter products when category changes
  useEffect(() => {
    let filtered =
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        case "price":
          return (a.price || 0) - (b.price || 0);
        case "newest":
        default:
          return 0; // Already sorted by creation date in query
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, products, sortBy]);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle sort change
  const handleSortChange = (sort: "name" | "price" | "newest") => {
    setSortBy(sort);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 backdrop-blur-sm to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e87b51]/10 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-[#e87b51]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-400 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality products designed
            to meet your needs
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8">
          {/* Category Filter */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-5xl">
              {loading ? (
                <div className="flex justify-center space-x-3 sm:space-x-4">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="px-6 py-3 rounded-xl animate-pulse"
                    >
                      <div className="w-20 h-4 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-3 sm:space-x-4 pb-2 whitespace-nowrap min-w-max sm:min-w-0 sm:justify-center px-4 sm:px-0">
                    {categories.map((category) => {
                      const isActive = selectedCategory === category;
                      const categoryCount =
                        category === "All"
                          ? products.length
                          : products.filter((p) => p.category === category)
                              .length;

                      return (
                        <button
                          key={category}
                          onClick={() => handleCategoryClick(category)}
                          className={`
                            relative px-6 py-3 rounded-xl font-semibold text-sm sm:text-base
                            transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e87b51]/50
                            shadow-lg hover:shadow-xl
                            ${
                              isActive
                                ? "bg-[#e87b51] text-white shadow-[#e87b51]/30"
                                : " text-gray-400  border border-[#e87b51]"
                            }
                          `}
                        >
                          <span className="capitalize">{category}</span>
                          <span
                            className={`ml-2 text-xs px-2 py-1 rounded-full ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-gray-400 text-gray-100"
                            }`}
                          >
                            {categoryCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          {!loading && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 rounded-xl p-4 shadow-sm border border-gray-200">
              {/* Results Count */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                  {selectedCategory !== "All" && (
                    <span className="text-[#e87b51]">
                      {" "}
                      in {selectedCategory}
                    </span>
                  )}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      handleSortChange(
                        e.target.value as "name" | "price" | "newest"
                      )
                    }
                    className="px-3 text-gray-500 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e87b51]/50 focus:border-[#e87b51]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="name">Name A-Z</option>
                    <option value="price">Price Low-High</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleViewModeChange("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "text-[#e87b51] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="Grid View"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleViewModeChange("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-[#e87b51] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="List View"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
          >
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className=" rounded-xl shadow-sm border overflow-hidden animate-pulse"
              >
                <div className="aspect-square "></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === "All"
                ? "We don't have any products available at the moment."
                : `No products found in the "${selectedCategory}" category.`}
            </p>
            {selectedCategory !== "All" && (
              <button
                onClick={() => handleCategoryClick("All")}
                className="px-6 py-2 bg-[#e87b51] text-white rounded-lg hover:bg-[#d66a42] transition-colors"
              >
                View All Products
              </button>
            )}
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

// Product Card Component
const ProductCard: React.FC<{
  product: Product;
  viewMode: "grid" | "list";
}> = ({ product, viewMode }) => {
  const [imageError, setImageError] = useState(false);
  const hasDiscount =
    product.originalPrice &&
    product.price &&
    product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price!) / product.originalPrice!) *
          100
      )
    : 0;

  if (viewMode === "list") {
    return (
      <Link href={`/product/${product._id}`} className="block">
        <div className="blur rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-48 aspect-square sm:aspect-auto overflow-hidden">
            {product.mainImage?.asset?.url && !imageError ? (
              <Image
                src={product.mainImage.asset.url}
                alt={product.name || "Product image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              {product.featured && (
                <span className="px-2 py-1 bg-[#e87b51] text-white text-xs font-semibold rounded-full">
                  Featured
                </span>
              )}
              {hasDiscount && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  -{discountPercentage}%
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#e87b51] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {product.category}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice?.toFixed(2) || "0.00"}
                    </span>
                  )}
                  <span className="text-xl font-bold text-[#e87b51]">
                    ${(product.price || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {product.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
            )}
          
            <div className="flex items-center justify-end">
              <span className="px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 bg-[#e87b51] text-white group-hover:bg-[#d66a42] group-hover:shadow-lg transform group-hover:-translate-y-0.5">
                View Details
              </span>
            </div>
          </div>
        </div>
        </div>
      </Link>
    );
  }

  // Grid view
  return (
    <div className="backdrop-blur-sm rounded-xl shadow-sm border hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      <Link href={`/product/${product._id}`}>

          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            {product.mainImage?.asset?.url && !imageError ? (
              <Image
                src={product.mainImage.asset.url}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.featured && (
            <span className="px-2 py-1 bg-[#e87b51] text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#e87b51] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        </div>

        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice?.toFixed(2) || "0.00"}
            </span>
          )}
          <span className="text-lg font-bold text-[#e87b51]">
            ${(product.price || 0).toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 bg-[#e87b51] text-white hover:bg-[#d66a42] hover:shadow-lg transform hover:-translate-y-0.5">
          View Details
        </button>
      </div>
      </Link>
    </div>
  );
};

export default ProductsSection;
