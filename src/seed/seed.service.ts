import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { BlogPost, BlogPostDocument } from '../blog/blog-post.schema';
import {
  placeholderImage,
  PRICE_LIST_ID,
  priceList,
  priceListProducts,
  seedBlogPosts,
  seedProducts,
} from './seed-data';


@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(BlogPost.name) private postModel: Model<BlogPostDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async onModuleInit() {
    const email = this.config.getOrThrow<string>('ADMIN_EMAIL').toLowerCase();
    const password = this.config.getOrThrow<string>('ADMIN_PASSWORD');
    const passwordHash = await bcrypt.hash(password, 10);
    await this.userModel.findOneAndUpdate(
      { email },
      { email, passwordHash, role: 'admin' },
      { upsert: true, new: true },
    );
    this.logger.log(`Admin user ready: ${email}`);

    const productCount = await this.productModel.countDocuments().exec();
    if (productCount === 0) {
      await this.productModel.insertMany(seedProducts);
      this.logger.log(`Seeded ${seedProducts.length} products`);
    }

    await this.runOnce(PRICE_LIST_ID, () => this.applyPriceList());

    // The "atf" category was folded into "transmission-fluid".
    await this.productModel
      .updateMany({ category: 'atf' }, { category: 'transmission-fluid' })
      .exec();

    const postCount = await this.postModel.countDocuments().exec();
    if (postCount === 0) {
      await this.postModel.insertMany(seedBlogPosts);
      this.logger.log(`Seeded ${seedBlogPosts.length} blog posts`);
    }
  }

  /** Runs a data migration once per database, recorded in `seed_markers`. */
  private async runOnce(key: string, migrate: () => Promise<void>) {
    const markers = this.connection.collection('seed_markers');
    if (await markers.findOne({ key })) return;
    await migrate();
    await markers.insertOne({ key, appliedAt: new Date() });
    this.logger.log(`Applied ${key}`);
  }

  /**
   * Adds the brochure / price-list products and sets every listed product's
   * prices. A product whose photo an admin already replaced keeps its content.
   */
  private async applyPriceList() {
    for (const product of priceListProducts) {
      const existing = await this.productModel.findOne({ slug: product.slug }).exec();
      if (!existing) {
        await this.productModel.create(product);
      } else if ([placeholderImage, product.image].includes(existing.image)) {
        await this.productModel.updateOne({ _id: existing._id }, { $set: product }).exec();
      }
    }

    for (const [slug, prices] of Object.entries(priceList)) {
      await this.productModel.updateOne({ slug }, { $set: prices }).exec();
    }
  }
}
