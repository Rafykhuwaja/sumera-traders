import { type SchemaTypeDefinition } from 'sanity'
import ProductSchema from './Product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ProductSchema],
}
