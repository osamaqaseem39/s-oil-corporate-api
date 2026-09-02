import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { User, UserSchema } from '../users/user.schema';
import { Product, ProductSchema } from '../products/product.schema';
import { BlogPost, BlogPostSchema } from '../blog/blog-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
