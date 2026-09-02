import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { BlogPost, BlogPostDocument } from '../blog/blog-post.schema';
import { seedBlogPosts, seedProducts } from './seed-data';


@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(BlogPost.name) private postModel: Model<BlogPostDocument>,
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

    const postCount = await this.postModel.countDocuments().exec();
    if (postCount === 0) {
      await this.postModel.insertMany(seedBlogPosts);
      this.logger.log(`Seeded ${seedBlogPosts.length} blog posts`);
    }
  }
}
