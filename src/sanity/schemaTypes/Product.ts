interface Packaging {
  productBoxSizes?: string[];
  productCase?: string[];
  NoOfPcs?: string[];
}

interface CustomOrders {
  WoodenOrMarbleBase?: string;
  boxPackaging?: string;
  caseCarton?: string;
}

interface ProductField {
  name: string;
  title: string;
  type: string;
  validation?: (Rule: any) => any;
  options?: {
    hotspot?: boolean;
  };
  of?: Array<{ type: string; options?: { hotspot?: boolean } }>;
  description?: string;
  fields?: Array<{
    name: string;
    title: string;
    type: string;
    of?: Array<{ type: string }>;
  }>;
}

interface ProductSchemaType {
  name: string;
  title: string;
  type: string;
  fields: ProductField[];
}

const ProductSchema: ProductSchemaType = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'category',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'shape',
      title: 'Shape',
      type: 'string',
      description: 'Descriptive name or dimensions grouping',
    },
    {
      name: 'weightOptions',
      title: 'Weight Options',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'packaging',
      title: 'Packaging',
      type: 'object',
      fields: [
        {
          name: 'productBoxSizes',
          title: 'Product Box Sizes',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'productCase',
          title: 'Product Case/Carton',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'NoOfPcs',
          title: 'No of Pieces',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'ElectricalComponents',
      title: 'Electrical Components',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'customOrders',
      title: 'Custom Order Details',
      type: 'object',
      fields: [
        { name: 'WoodenOrMarbleBase', title: 'WOODEN / MARBLE BASE', type: 'string' },
        { name: 'boxPackaging', title: 'Custom Box Packaging', type: 'string' },
        { name: 'caseCarton', title: 'Custom Case/Carton', type: 'string' },
      ],
    },
    {
      name: 'shippingServices',
      title: 'Shipping Services',
      type: 'string',
      description: 'E.g.: We Offer Complete Logistics Solution',
    },
    {
      name: 'ShippingOptionsPrices',
      title: 'Shipping Options & Prices',
      type: 'array',
      of: [{ type: 'string' }],
    },

  ],
};




export default ProductSchema;