import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type definition for your product
interface Product {
  _id: string;
  title: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  galleryImages?: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  materials?: string;
  shape?: string;
  weightOptions?: string[];
  dimensions?: string;
  packaging?: {
    productBoxSizes?: string;
    productCase?: string;
    NoOfPcs?: number;
  };
  ElectricalComponents?: string;
  customOrders?: {
    WoodenOrMarbleBase?: boolean;
    boxPackaging?: string;
    caseCarton?: string;
  };
  shippingServices?: string[];
  ShippingOptionsPrices?: string;
}

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Corrected GROQ query with proper parameter handling
  const fetchCategoryData: Product[] = await client.fetch(
    `*[_type == "product" && category == $slug]{
      _id,
      title,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      galleryImages[]{
        asset->{
          _id,
          url
        },
        alt
      },
      materials,
      shape,
      weightOptions,
      dimensions,
      packaging {
        productBoxSizes,
        productCase,
        NoOfPcs
      },
      ElectricalComponents,
      customOrders {
        WoodenOrMarbleBase,
        boxPackaging,
        caseCarton
      },
      shippingServices,
      ShippingOptionsPrices
    }`,
    { slug } // Pass slug as a parameter
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 capitalize">
        {slug.replace('-', ' ')} Products
      </h1>
      
      {fetchCategoryData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No products found in the &quot;{slug}&quot; category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fetchCategoryData.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="aspect-square relative bg-gray-100">
                {product.mainImage?.asset ? (
                  <Image
                    src={urlFor(product.mainImage).width(400).height(400).url()}
                    alt={product.mainImage.alt || product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                
                {/* Optional: Show additional info */}
                <div className="space-y-1 text-sm text-gray-600">
                  {product.materials && (
                    <p>
                      <span className="font-medium">Material:</span> {product.materials}
                    </p>
                  )}
                  {product.shape && (
                    <p>
                      <span className="font-medium">Shape:</span> {product.shape}
                    </p>
                  )}
                  {product.dimensions && (
                    <p>
                      <span className="font-medium">Dimensions:</span> {product.dimensions}
                    </p>
                  )}
                </div>
                
                {/* Action Button */}
                <Link href={`/category/${slug}/${product._id}`} className="block">
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;