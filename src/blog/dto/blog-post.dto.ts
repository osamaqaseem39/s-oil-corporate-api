import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { BLOG_CATEGORIES } from '../blog-post.schema';

export class CreateBlogPostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;
  

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsIn(BLOG_CATEGORIES)
  category: string;

  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  readTime?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  content?: string[];

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: 'draft' | 'published';
}

export class UpdateBlogPostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsIn(BLOG_CATEGORIES)
  category?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  readTime?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  content?: string[];

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: 'draft' | 'published';
}
