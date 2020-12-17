import { Schema, model, Document, SchemaTypeOpts } from 'mongoose';
import ModelConfig from '../config/model';
import { BaseModelFields } from '../types/Model';

export interface Product extends BaseModelFields {
  name: string;
  quantity: number;
}

const fields: Record<
  keyof Omit<Product, keyof BaseModelFields>,
  SchemaTypeOpts<unknown>
> = {
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, default: 0 },
};

const ProductSchema = new Schema(fields, {
  timestamps: ModelConfig.customTimestamps,
});

const ProductModel = model<Product & Document>('Product', ProductSchema);

export default ProductModel;
