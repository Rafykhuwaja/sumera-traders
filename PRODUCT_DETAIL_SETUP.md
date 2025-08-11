# Product Detail Page Setup Guide

This guide provides comprehensive instructions for setting up and using the product detail page system in your Next.js application.

## 📁 File Structure

```
src/
├── app/
│   ├── product/
│   │   └── [id]/
│   │       ├── page.tsx          # Main product detail page (Server Component)
│   │       └── not-found.tsx     # 404 page for invalid product IDs
│   ├── layout.tsx                # Root layout with navigation
│   └── globals.css               # Global styles
├── components/
│   ├── ProductDetailClient.tsx   # Client component for product detail
│   ├── products.tsx              # Updated products listing with links
│   ├── ui/
│   │   └── Toast.tsx            # Toast notification component
│   └── layout/
│       └── Navbar.tsx           # Navigation component
└── hooks/
    └── useToast.ts              # Toast notification hook
```

## 🚀 Features Implemented

### ✅ Product Detail Page
- **Dynamic routing**: `/product/[id]` for individual products
- **Server-side rendering**: SEO-optimized with metadata generation
- **Responsive design**: Works on desktop, tablet, and mobile
- **Image gallery**: Main image with thumbnail navigation
- **Product information**: Title, description, price, specifications
- **Interactive elements**: Quantity selector, wishlist, share functionality
- **Related products**: Shows similar items from the same category

### ✅ Enhanced UI Components
- **Toast notifications**: Success/error/info/warning messages
- **Image carousel**: Navigate through product images
- **Responsive grid**: Adapts to different screen sizes
- **Loading states**: Skeleton loaders for better UX
- **Error handling**: Graceful fallbacks for missing data

### ✅ TypeScript Integration
- **Type safety**: Full TypeScript support with interfaces
- **Enhanced Product interface**: Extended with gallery, specifications
- **Props validation**: Proper typing for all components

## 🛠️ Setup Instructions

### 1. Dependencies Check

Your project already has the required dependencies. Ensure these are installed:

```bash
npm install next react react-dom @types/node @types/react @types/react-dom typescript tailwindcss lucide-react
```

### 2. Tailwind CSS Configuration

Your `tailwind.config.ts` should include:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e87b51",
      },
    },
  },
  plugins: [],
};
export default config;
```

### 3. Global CSS Additions

Add these utility classes to your `globals.css`:

```css
/* Line clamp utilities */
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* Custom scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

## 📊 Sanity CMS Schema Updates

To fully utilize the product detail page, update your Sanity product schema to include:

```javascript
// schemas/product.js
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'text'
    },
    {
      name: 'weight',
      title: 'Weight',
      type: 'string'
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string'
    },
    {
      name: 'material',
      title: 'Material',
      type: 'string'
    }
  ]
}
```

## 🎯 Usage Examples

### 1. Linking to Product Detail Pages

From any component, link to a product detail page:

```tsx
import Link from 'next/link';

<Link href={`/product/${productId}`}>
  View Product Details
</Link>
```

### 2. Using Toast Notifications

```tsx
import { useToast } from '@/hooks/useToast';

const MyComponent = () => {
  const { showToast } = useToast();

  const handleAction = () => {
    showToast({
      message: 'Product added to cart!',
      type: 'success',
      duration: 3000 // optional, defaults to 3000ms
    });
  };

  return <button onClick={handleAction}>Add to Cart</button>;
};
```

### 3. Customizing Product Display

The `ProductDetailClient` component accepts these props:

```tsx
interface ProductDetailClientProps {
  product: ProductDetail;
  relatedProducts: ProductDetail[];
}
```

## 🎨 Styling Customization

### Color Scheme
The design uses your existing color palette:
- Primary: `#e87b51` (orange)
- Secondary: `#a7d8de` (light blue)
- Background: Black with gradients

### Responsive Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

### Custom Components
All components are styled with Tailwind CSS and can be easily customized by modifying the className props.

## 🔧 Advanced Configuration

### 1. SEO Optimization

The product detail page automatically generates:
- Dynamic page titles
- Meta descriptions
- Open Graph tags
- Structured data (can be extended)

### 2. Performance Optimization

- **Image optimization**: Next.js Image component with proper sizing
- **Static generation**: Pre-renders product pages at build time
- **Lazy loading**: Images load as needed
- **Code splitting**: Client components load separately

### 3. Error Handling

- **404 pages**: Custom not-found page for invalid product IDs
- **Image fallbacks**: Placeholder images for missing assets
- **Loading states**: Skeleton loaders during data fetching

## 🚀 Running the Application

1. **Development mode**:
   ```bash
   npm run dev
   ```

2. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

3. **Access product pages**:
   - Navigate to `/products` to see the product listing
   - Click on any product to view its detail page
   - URL format: `/product/[sanity-document-id]`

## 🐛 Troubleshooting

### Common Issues

1. **Hydration errors**: Ensure consistent data between server and client
2. **Image loading issues**: Check Sanity image URLs and permissions
3. **TypeScript errors**: Verify all interfaces match your data structure
4. **Styling issues**: Ensure Tailwind CSS is properly configured

### Debug Tips

1. Check browser console for errors
2. Verify Sanity data structure matches TypeScript interfaces
3. Test with different product IDs
4. Ensure all required environment variables are set

## 📱 Mobile Responsiveness

The product detail page is fully responsive with:
- **Mobile-first design**: Optimized for small screens
- **Touch-friendly interactions**: Large buttons and touch targets
- **Swipe gestures**: Image gallery navigation
- **Adaptive layouts**: Content reflows based on screen size

## 🔒 Security Considerations

- **Input validation**: All user inputs are validated
- **XSS protection**: React's built-in XSS protection
- **Image security**: Sanity CDN handles image security
- **Type safety**: TypeScript prevents runtime errors

This setup provides a complete, production-ready product detail page system with modern best practices and excellent user experience.