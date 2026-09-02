import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blog')
@UseGuards(JwtAuthGuard)
export class BlogController {
  constructor(private blog: BlogService) {}

  @Get()
  findAll(@Query('q') q?: string, @Query('status') status?: string) {
    return this.blog.findAll(q, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blog.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBlogPostDto) {
    return this.blog.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBlogPostDto) {
    return this.blog.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blog.remove(id);
  }
}
