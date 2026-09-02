import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

export const PRODUCT_CATEGORIES = [
  'passenger-car',
  'motorcycle',
  'diesel',
  'gear-oil',
  'treatment',
  'atf',
  'hydraulic-oil',
  'brake-fluid',
] as const;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ required: true, enum: PRODUCT_CATEGORIES })
  category: string;

  @Prop({ required: true })
  viscosity: string;

  @Prop({ default: '' })
  packSize: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: '' })
  shortDescription: string;

  @Prop({ type: [String], default: [] })
  benefits: string[];

  @Prop({
    type: [
      {
        label: { type: String },
        value: { type: String },
        _id: false,
      },
    ],
    default: [],
  })
  specs: { label: string; value: string }[];

  @Prop({ default: '' })
  usage: string;

  @Prop({ default: '#' })
  datasheetUrl: string;

  @Prop({ default: '#' })
  msdsUrl: string;

  @Prop({ default: '' })
  shopUrl: string;

  @Prop({ default: 'draft', enum: ['draft', 'published'] })
  status: 'draft' | 'published';
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export function toProduct(doc: ProductDocument) {
  const o = doc.toObject();
  return {
    id: String(o._id),
    name: o.name,
    slug: o.slug,
    category: o.category,
    viscosity: o.viscosity,
    packSize: o.packSize ?? '',
    image: o.image ?? '',
    shortDescription: o.shortDescription ?? '',
    benefits: o.benefits ?? [],
    specs: (o.specs ?? []).map((s: { label?: string; value?: string }) => ({
      label: s.label ?? '',
      value: s.value ?? '',
    })),
    usage: o.usage ?? '',
    datasheetUrl: o.datasheetUrl ?? '#',
    msdsUrl: o.msdsUrl ?? '#',
    shopUrl: o.shopUrl ?? '',
    status: o.status,
  };
}
