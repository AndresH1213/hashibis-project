import { FromSchema } from 'json-schema-to-ts';
import ProductSch from '../lib/schemas/ProductSchema';

const ProductSchema = ProductSch.getSchema();
export type IProduct = FromSchema<typeof ProductSchema>;
export interface ProductProps extends Partial<IProduct> {
  id: string;
}
export type getAllProps = {
  limit: number;
  lastEvaluatedKey?: Record<string, any>;
};
