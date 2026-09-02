import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnquiryDocument = HydratedDocument<Enquiry>;

export const ENQUIRY_TYPES = ['contact', 'partner', 'career'] as const;

@Schema({ timestamps: true })
export class Enquiry {
  @Prop({ required: true, enum: ENQUIRY_TYPES })
  type: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  subject: string;

  @Prop({ default: '' })
  company: string;

  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  position: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  read: boolean;

  createdAt?: Date;
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);

export function toEnquiry(doc: EnquiryDocument) {
  const o = doc.toObject();
  return {
    id: String(o._id),
    type: o.type,
    name: o.name,
    email: o.email,
    phone: o.phone ?? '',
    subject: o.subject ?? '',
    company: o.company ?? '',
    city: o.city ?? '',
    position: o.position ?? '',
    message: o.message,
    read: o.read,
    createdAt: o.createdAt,
  };
}
