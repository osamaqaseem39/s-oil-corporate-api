import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { BlogModule } from '../blog/blog.module';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [ProductsModule, BlogModule],
  controllers: [CatalogController],
})
export class CatalogModule {}
