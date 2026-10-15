import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { BlogModule } from '../blog/blog.module';
import { DealersModule } from '../dealers/dealers.module';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [ProductsModule, BlogModule, DealersModule],
  controllers: [CatalogController],
})
export class CatalogModule {}
