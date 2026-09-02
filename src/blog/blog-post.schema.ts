import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogPostDocument = HydratedDocument<BlogPost>;

export const BLOG_CATEGORIES = ['engine-tips', 'maintenance', 'industry'] as const;

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ default: '' })
  excerpt: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ required: true, enum: BLOG_CATEGORIES })
  category: string;

  @Prop({ required: true })
  date: string;

  @Prop({ default: '' })
  readTime: string;

  @Prop({ type: [String], default: [] })
  content: string[];

  @Prop({ default: 'draft', enum: ['draft', 'published'] })
  status: 'draft' | 'published';
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

export function toBlogPost(doc: BlogPostDocument) {
  const o = doc.toObject();
  return {
    id: String(o._id),
    title: o.title,
    slug: o.slug,
    excerpt: o.excerpt ?? '',
    image: o.image ?? '',
    category: o.category,
    date: o.date,
    readTime: o.readTime ?? '',
    content: o.content ?? [],
    status: o.status,
  };
}
