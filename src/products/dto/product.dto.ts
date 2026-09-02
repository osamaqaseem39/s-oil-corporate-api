import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PRODUCT_CATEGORIES } from '../product.schema';

class SpecDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  label: string;

  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsIn(PRODUCT_CATEGORIES)
  category: string;

  @IsString()
  viscosity: string;

  @IsOptional()
  @IsString()
  packSize?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  benefits?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecDto)
  specs?: SpecDto[];

  @IsOptional()
  @IsString()
  usage?: string;

  @IsOptional()
  @IsString()
  datasheetUrl?: string;

  @IsOptional()
  @IsString()
  msdsUrl?: string;

  @IsOptional()
  @IsString()
  shopUrl?: string;

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: 'draft' | 'published';
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsIn(PRODUCT_CATEGORIES)
  category?: string;

  @IsOptional()
  @IsString()
  viscosity?: string;

  @IsOptional()
  @IsString()
  packSize?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  benefits?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecDto)
  specs?: SpecDto[];

  @IsOptional()
  @IsString()
  usage?: string;

  @IsOptional()
  @IsString()
  datasheetUrl?: string;

  @IsOptional()
  @IsString()
  msdsUrl?: string;

  @IsOptional()
  @IsString()
  shopUrl?: string;

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: 'draft' | 'published';
}
