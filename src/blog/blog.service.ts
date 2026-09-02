import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost, BlogPostDocument, toBlogPost } from './blog-post.schema';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog-post.dto';
import { slugify } from '../common/slug';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name) private postModel: Model<BlogPostDocument>,
  ) {}

  async findAll(q?: string, status?: string) {
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { slug: { $regex: q, $options: 'i' } },
      ];
    }
    const docs = await this.postModel.find(filter).sort({ date: -1 }).exec();
    return docs.map(toBlogPost);
  }

  async findOne(id: string) {
    const doc = await this.postModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Post not found');
    return toBlogPost(doc);
  }

  async findBySlug(slug: string, publishedOnly = false) {
    const normalized = slugify(decodeURIComponent(slug));
    const filter: Record<string, unknown> = { slug: normalized };
    if (publishedOnly) filter.status = 'published';
    const doc = await this.postModel.findOne(filter).exec();
    if (!doc) throw new NotFoundException('Post not found');
    return toBlogPost(doc);
  }

  async findPublished(q?: string, category?: string) {
    const filter: Record<string, unknown> = { status: 'published' };
    if (category) filter.category = category;
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { slug: { $regex: q, $options: 'i' } },
      ];
    }
    const docs = await this.postModel.find(filter).sort({ date: -1 }).exec();
    return docs.map(toBlogPost);
  }

  async create(dto: CreateBlogPostDto) {
    const slug = slugify(dto.slug || dto.title);
    if (!slug) throw new BadRequestException('A valid slug is required');
    const doc = await this.postModel.create({
      ...dto,
      slug,
      status: dto.status ?? 'draft',
      content: dto.content ?? [],
    });
    return toBlogPost(doc);
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    const patch: Record<string, unknown> = { ...dto };
    if (dto.slug !== undefined) {
      const slug = slugify(dto.slug);
      if (!slug) throw new BadRequestException('A valid slug is required');
      patch.slug = slug;
    }
    const doc = await this.postModel
      .findByIdAndUpdate(id, patch, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Post not found');
    return toBlogPost(doc);
  }

  async remove(id: string) {
    const doc = await this.postModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Post not found');
    return { ok: true };
  }

  count() {
    return this.postModel.countDocuments().exec();
  }
}
