import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DealerDocument = HydratedDocument<Dealer>;

export const DEALER_TYPES = ['dealer', 'distributor'] as const;

@Schema({ timestamps: true })
export class Dealer {
  @Prop({ required: true, enum: DEALER_TYPES })
  type: string;

  /** Dealer / Distributor name as shown on the website. */
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: '', trim: true })
  businessName: string;

  @Prop({ default: '', trim: true })
  ownerName: string;

  @Prop({ default: '', trim: true })
  phone: string;

  @Prop({ default: '', trim: true })
  address: string;

  @Prop({ required: true, trim: true })
  city: string;

  @Prop({ default: 'Pakistan', trim: true })
  country: string;

  @Prop({ default: 'published', enum: ['draft', 'published'] })
  status: 'draft' | 'published';
}

export const DealerSchema = SchemaFactory.createForClass(Dealer);
DealerSchema.index({ status: 1, city: 1 });

export function toDealer(doc: DealerDocument) {
  const o = doc.toObject();
  return {
    id: String(o._id),
    type: o.type,
    name: o.name,
    businessName: o.businessName ?? '',
    ownerName: o.ownerName ?? '',
    phone: o.phone ?? '',
    address: o.address ?? '',
    city: o.city,
    country: o.country ?? '',
    status: o.status,
  };
}
