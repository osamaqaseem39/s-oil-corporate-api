import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { BlogService } from '../blog/blog.service';
import { DealersService } from '../dealers/dealers.service';

@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly blogService: BlogService,
    private readonly dealersService: DealersService,
  ) {}

  @Get('products')
  listProducts(@Query('q') q?: string, @Query('category') category?: string) {
    return this.productsService.findPublished(q, category);
  }

  @Get('products/by-slug/:slug')
  productBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug, true);
  }

  @Get('blog')
  listBlogPosts(@Query('q') q?: string, @Query('category') category?: string) {
    return this.blogService.findPublished(q, category);
  }

  @Get('blog/by-slug/:slug')
  blogPostBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug, true);
  }

  @Get('dealers')
  listDealers(
    @Query('q') q?: string,
    @Query('type') type?: string,
    @Query('city') city?: string,
  ) {
    return this.dealersService.findPublished(q, type, city);
  }
}
