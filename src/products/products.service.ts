import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument, toProduct } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { slugify } from '../common/slug';

function sanitizeSpecs(specs?: { label: string; value: string; _id?: string }[]) {
  return (specs ?? []).map(({ label, value }) => ({ label, value }));
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(q?: string, status?: string) {
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { slug: { $regex: q, $options: 'i' } },
      ];
    }
    const docs = await this.productModel.find(filter).sort({ updatedAt: -1 }).exec();
    return docs.map(toProduct);
  }

  async findOne(id: string) {
    const doc = await this.productModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Product not found');
    return toProduct(doc);
  }

  async findBySlug(slug: string, publishedOnly = false) {
    const normalized = slugify(decodeURIComponent(slug));
    const filter: Record<string, unknown> = { slug: normalized };
    if (publishedOnly) filter.status = 'published';
    const doc = await this.productModel.findOne(filter).exec();
    if (!doc) throw new NotFoundException('Product not found');
    return toProduct(doc);
  }

  async findPublished(q?: string, category?: string) {
    const filter: Record<string, unknown> = { status: 'published' };
    if (category) filter.category = category;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { slug: { $regex: q, $options: 'i' } },
      ];
    }
    const docs = await this.productModel.find(filter).sort({ updatedAt: -1 }).exec();
    return docs.map(toProduct);
  }

  async create(dto: CreateProductDto) {
    const slug = slugify(dto.slug || dto.name);
    if (!slug) throw new BadRequestException('A valid slug is required');
    const doc = await this.productModel.create({
      ...dto,
      slug,
      status: dto.status ?? 'draft',
      benefits: dto.benefits ?? [],
      specs: sanitizeSpecs(dto.specs),
    });
    return toProduct(doc);
  }

  async update(id: string, dto: UpdateProductDto) {
    const patch: Record<string, unknown> = { ...dto };
    if (dto.slug !== undefined) {
      const slug = slugify(dto.slug);
      if (!slug) throw new BadRequestException('A valid slug is required');
      patch.slug = slug;
    }
    if (dto.specs !== undefined) {
      patch.specs = sanitizeSpecs(dto.specs);
    }
    const doc = await this.productModel
      .findByIdAndUpdate(id, patch, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Product not found');
    return toProduct(doc);
  }

  async remove(id: string) {
    const doc = await this.productModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Product not found');
    return { ok: true };
  }

  count() {
    return this.productModel.countDocuments().exec();
  }
}
